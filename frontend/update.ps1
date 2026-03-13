$files = @("scan.html", "report.html", "legal.html", "how-it-works.html", "dashboard.html", "auth.html")

foreach ($f in $files) {
    Write-Host "Processing $f"
    (Get-Content $f) | ForEach-Object {
        $line = $_ -replace "(<link\s+rel=`"stylesheet`"\s+href=`"styles\.css\?v=\d+`">)", "`$1`n  <link rel=`"stylesheet`" href=`"voice-assistant.css?v=1`">"
        $line = $line -replace "(<script\s+src=`"app\.js\?v=\d+`"></script>)", "`$1`n  <script src=`"voice-assistant.js?v=1`"></script>"
        $line
    } | Set-Content $f
    Write-Host "Updated $f"
}
