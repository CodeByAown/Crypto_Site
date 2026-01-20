$files = @(
    "about_us.html", "agent_portal.html", "agents.html", "banks.html", 
    "blog.html", "branches.html", "contact_us.html", "deals.html", 
    "feed.html", "login.html", "merchant.html", "products.html", 
    "profile.html", "videos.html"
)
$templateContent = Get-Content -Path "template.html" -Raw

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        $content = Get-Content -Path $file -Raw
        $mainContent = ""
        
        # Try finding content between header and footer
        if ($content -match '(?ms)</header>(.*?)<footer') {
            $mainContent = $matches[1]
        } elseif ($content -match '(?ms)<main.*?>(.*?)<\/main>') {
            $mainContent = $matches[1]
        } else {
            Write-Warning "Skipping ${file}: Could not find content block (header/footer or main)."
            continue
        }

        # Fix paths
        $mainContent = $mainContent -replace 'src="[^"]+_files/([^"]+\.(png|jpg|jpeg|svg|gif|webp))"', 'src="assets/img/$1"'
        $mainContent = $mainContent -replace 'src="[^"]+_files/([^"\.]+)"', 'src="assets/img/$1.jpg"'
        
        # Extract title
        if ($content -match '<title>(.*?)</title>') {
            $title = $matches[1]
            $currentTemplate = $templateContent -replace '<title>.*?</title>', "<title>$title</title>"
        } else {
            $currentTemplate = $templateContent
        }

        $newContent = $currentTemplate -replace '<!-- PAGE CONTENT GOES HERE -->', $mainContent
        Set-Content -Path $file -Value $newContent
        Write-Host "Refactored $file"
    }
}
