$indexContent = Get-Content -Path "index.html" -Raw
$templateContent = Get-Content -Path "template.html" -Raw

# Extract valid content from index.html (between <main> and </main> or <footer>)
if ($indexContent -match '(?ms)<main.*?>(.*?)<\/main>') {
    $mainContent = $matches[1]
} elseif ($indexContent -match '(?ms)<main.*?>(.*?)<footer') {
    # Fallback if </main> is missing but footer exists
    $mainContent = $matches[1]
} else {
    # Fallback if structure is very different, just try to grab sections
    Write-Host "Could not find standard main block, trying sections..."
    if ($indexContent -match '(?ms)(<section.*<\/section>)') {
        $mainContent = $matches[1]
    } else {
        Write-Error "Could not extract content from index.html"
        exit 1
    }
}

# Regex to fix image paths
# Case 1: Files with extensions (keep extension)
$mainContent = $mainContent -replace 'src="[^"]+_files/([^"]+\.(png|jpg|jpeg|svg|gif|webp))"', 'src="assets/img/$1"'
# Case 2: Files without extensions (add .jpg)
$mainContent = $mainContent -replace 'src="[^"]+_files/([^"\.]+)"', 'src="assets/img/$1.jpg"'

# Replace the placeholder in template
$newIndex = $templateContent -replace '<!-- PAGE CONTENT GOES HERE -->', $mainContent

# Additional cleanups
# Remove Figma specific comments or attributes if easy, but mostly handled by template structure.

 Set-Content -Path "index.html" -Value $newIndex
 Write-Host "Refactored index.html successfully."
