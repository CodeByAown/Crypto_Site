$files = @("index.html", "template.html")

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        # Find all src="assets/img/..." that don't end in an extension
        $matchesList = [Regex]::Matches($content, 'src="(assets/img/[^"\.]+)("|)')
        
        foreach ($match in $matchesList) {
            $oldPath = $match.Groups[1].Value
            $fullPath = Join-Path (Get-Location) $oldPath
            
            # Check if file exists as is
            if (-not (Test-Path $fullPath)) {
                # Check if .jpg exists
                if (Test-Path "$fullPath.jpg") {
                    $newPath = "$oldPath.jpg"
                    $content = $content.Replace($oldPath, $newPath)
                    Write-Host "Fixed: $oldPath -> $newPath in $file"
                } elseif (Test-Path "$fullPath.png") {
                    $newPath = "$oldPath.png"
                    $content = $content.Replace($oldPath, $newPath)
                    Write-Host "Fixed: $oldPath -> $newPath in $file"
                }
            }
        }
        Set-Content -Path $file -Value $content
    }
}
