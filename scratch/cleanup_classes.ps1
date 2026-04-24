$files = Get-ChildItem -Recurse -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Fix the broken class="class="reveal-text""
    $content = $content -replace 'class="class="reveal-text""', 'class="reveal-text"'
    # Ensure txt-fx has reveal-text
    $content = $content -replace 'txt-fx', 'reveal-text txt-fx'
    # Remove duplicates
    $content = $content -replace 'reveal-text reveal-text', 'reveal-text'
    $content | Set-Content $file.FullName
}
