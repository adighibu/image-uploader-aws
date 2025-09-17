# 1️⃣ Obține URL-ul real al API Gateway din CloudFormation
$apiUrl = aws cloudformation describe-stacks `
  --stack-name image-uploader `
  --query "Stacks[0].Outputs[?OutputKey=='UploadAPIEndpoint'].OutputValue" `
  --output text

# 2️⃣ Creează conținutul pentru config.json
$configContent = "{`"API_BASE_URL`": `"$apiUrl`"}"

# 3️⃣ Scrie config.json în folderul frontend
Set-Content -Path .\frontend\config.json -Value $configContent

# 4️⃣ Trimite config.json în bucket-ul S3 unde ai frontend-ul
aws s3 cp .\frontend\config.json s3://img-upload-v1-adi-2025-12345/config.json
