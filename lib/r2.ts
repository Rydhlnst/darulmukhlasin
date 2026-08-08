import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function generatePresignedUrl(
  filename: string,
  contentType: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const key = `uploads/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(R2, command, { expiresIn: 300 });

  // Serve through the app proxy (same-origin) instead of the public r2.dev
  // domain, which is blocked by Indonesian ISP filtering.
  const publicUrl = `/api/media/${key}`;

  return { uploadUrl, publicUrl };
}

// Derives the R2 object key from whatever URL form we stored, or returns null
// if the value is not an R2-backed object (e.g. a local /gallery/* asset).
function resolveObjectKey(url: string): string | null {
  let key = url;
  if (key.startsWith("/api/media/")) {
    key = key.slice("/api/media/".length);
  } else if (
    process.env.R2_PUBLIC_URL &&
    key.startsWith(process.env.R2_PUBLIC_URL)
  ) {
    // Legacy r2.dev URLs stored before the proxy migration.
    key = key.slice(process.env.R2_PUBLIC_URL.length).replace(/^\//, "");
  }
  return key.startsWith("uploads/") ? key : null;
}

export async function deleteR2Object(url: string): Promise<void> {
  const objectKey = resolveObjectKey(url);
  if (!objectKey) return; // not an R2 object (e.g. seeded local image) — nothing to delete

  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: objectKey,
  });
  await R2.send(command);
}
