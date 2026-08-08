import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Serves R2 objects through the app (same-origin), so images work in Indonesia
 * where the public `*.r2.dev` domain is blocked by ISP filtering.
 *
 * GET /api/media/uploads/1234-foo.png  ->  streams that object from R2.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  const objectKey = key.map((segment) => decodeURIComponent(segment)).join("/");

  // Only user-uploaded objects live under this prefix — refuse anything else.
  if (!objectKey.startsWith("uploads/")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const obj = await R2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: objectKey,
      })
    );

    if (!obj.Body) {
      return new Response("Not found", { status: 404 });
    }

    const body = obj.Body.transformToWebStream();

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": obj.ContentType ?? "application/octet-stream",
        // Keys are unique (timestamped) so the object at a key never changes.
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(obj.ContentLength
          ? { "Content-Length": String(obj.ContentLength) }
          : {}),
        ...(obj.ETag ? { ETag: obj.ETag } : {}),
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
