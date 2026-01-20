$indexContent = Get-Content -Path "crypto.html" -Raw
$templateContent = Get-Content -Path "template.html" -Raw

# Extract content between </header> and <footer...
if ($indexContent -match '(?ms)</header>(.*?)<footer') {
    $mainContent = $matches[1]
    # Clean up any wrapping divs if they duplicate template's wrapper, but safe to keep for now.
    # We might need to wrap it in <main> if the template has <main> but indexContent doesn't.
    # Template has <main><!-- PAGE CONTENT --></main>.
    # So we just inject the content.
} else {
    Write-Error "Could not extract content from crypto.html"
    exit 1
}

# Regex to fix image paths
$mainContent = $mainContent -replace 'src="[^"]+_files/([^"]+\.(png|jpg|jpeg|svg|gif|webp))"', 'src="assets/img/$1"'
$mainContent = $mainContent -replace 'src="[^"]+_files/([^"\.]+)"', 'src="assets/img/$1.jpg"'

# Replace the placeholder in template
# Note: Template title might need to be dynamic? 
# template.html has <title>Design Fintech Homepage</title>. 
# We should try to extract title from crypto.html if possible.
if ($indexContent -match '<title>(.*?)</title>') {
    $title = $matches[1]
    $templateContent = $templateContent -replace '<title>.*?</title>', "<title>$title</title>"
}

$newIndex = $templateContent -replace '<!-- PAGE CONTENT GOES HERE -->', $mainContent

Set-Content -Path "crypto.html" -Value $newIndex
Write-Host "Refactored crypto.html successfully."
