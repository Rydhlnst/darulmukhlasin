import "dotenv/config";
import {
  S3Client,
  PutBucketCorsCommand,
  GetBucketCorsCommand,
} from "@aws-sdk/client-s3";

/**
 * Applies a CORS policy to the R2 bucket so the browser can PUT files
 * directly to presigned upload URLs from the deployment (and localhost).
 *
 * Run: npx tsx scripts/setup-r2-cors.ts
 */

const ALLOWED_ORIGINS = [
  "https://darulmukhlasinkuba.web.id",
  "https://www.darulmukhlasinkuba.web.id",
  "http://localhost:3000",
];

const bucket = process.env.R2_BUCKET_NAME;
const accountId = process.env.R2_ACCOUNT_ID;

if (!bucket || !accountId) {
  throw new Error("R2_BUCKET_NAME / R2_ACCOUNT_ID belum di-set di .env");
}

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function main() {
  console.log(`Menerapkan CORS ke bucket "${bucket}"...`);
  console.log("Allowed origins:");
  ALLOWED_ORIGINS.forEach((o) => console.log("  - " + o));

  await R2.send(
    new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: ALLOWED_ORIGINS,
            AllowedMethods: ["PUT", "GET", "HEAD"],
            AllowedHeaders: ["*"],
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    })
  );

  console.log("\n✓ CORS berhasil diterapkan. Verifikasi ulang:\n");

  const result = await R2.send(
    new GetBucketCorsCommand({ Bucket: bucket })
  );
  console.log(JSON.stringify(result.CORSRules, null, 2));
}

main().catch((err) => {
  console.error("\n✗ Gagal menerapkan CORS:");
  console.error(err?.message ?? err);
  process.exit(1);
});
