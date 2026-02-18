#!/usr/bin/env bash
# Deploy dist/ to S3. Set S3_BUCKET (and optionally AWS_PROFILE) before running.
# Example: S3_BUCKET=my-bucket npm run deploy

set -e

if [ -z "${S3_BUCKET}" ]; then
  echo "Set S3_BUCKET to your bucket name, e.g. S3_BUCKET=my-bucket npm run deploy"
  exit 1
fi

aws s3 sync dist/ "s3://${S3_BUCKET}" --delete

echo "Deployed to s3://${S3_BUCKET}"
