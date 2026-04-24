$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Fix the double class thing properly
    # Match: class="something class="reveal-text""
    $content = $content -replace 'class="([^"]*)\s+class="reveal-text""', 'class="$1 reveal-text"'
    # Match: class="class="reveal-text""
    $content = $content -replace 'class="class="reveal-text""', 'class="reveal-text"'
    
    # Final cleanup of any potential duplicates
    $content = $content -replace 'reveal-text reveal-text', 'reveal-text'
    $content | Set-Content $file.FullName
}
