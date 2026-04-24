$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Remove data-aos attributes
    $content = $content -replace 'data-aos="[^"]*"', ''
    # Remove txt-fx
    $content = $content -replace '\btxt-fx\b', ''
    # Remove slide-up
    $content = $content -replace '\bslide-up\b', ''
    # Replace reveal-text with reveal-fade
    $content = $content -replace '\breveal-text\b', 'reveal-fade'
    # Final cleanup of double spaces and empty class names
    $content = $content -replace '\s{2,}', ' '
    $content = $content -replace 'class="\s+', 'class="'
    $content = $content -replace '\s+"', '"'
    
    $content | Set-Content $file.FullName
}
