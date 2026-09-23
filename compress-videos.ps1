# Compresses all videos in public/ for fast web delivery.
#
# Requires ffmpeg:  winget install ffmpeg   (then restart the terminal)
#
# Run from the project root:
#   powershell -ExecutionPolicy Bypass -File .\compress-videos.ps1
#
# Output goes to public\optimized\ — check the videos, then replace the
# originals in public\ with the optimized ones (same file names).

$src = Join-Path $PSScriptRoot "public"
$out = Join-Path $src "optimized"
New-Item -ItemType Directory -Force -Path $out | Out-Null

# Videos bigger than this get compressed; tiny ones are copied as-is.
$thresholdMB = 2

Get-ChildItem $src -File -Include *.mp4, *.webm | ForEach-Object {
    $target = Join-Path $out ($_.BaseName + ".mp4")
    if ($_.Length / 1MB -lt $thresholdMB) {
        Copy-Item $_.FullName (Join-Path $out $_.Name) -Force
        Write-Host "SKIP (small): $($_.Name)"
        return
    }
    Write-Host "Compressing: $($_.Name) ($([math]::Round($_.Length/1MB,1)) MB)..."
    # H.264, CRF 28 (good quality, much smaller), max 1280px wide,
    # no audio (all videos on the site are muted), +faststart so playback
    # begins before the whole file is downloaded.
    ffmpeg -y -i $_.FullName `
        -vf "scale='min(1280,iw)':-2" `
        -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p `
        -movflags +faststart -an `
        $target
}

Write-Host ""
Write-Host "Done. Compare sizes:"
Get-ChildItem $out -File | ForEach-Object {
    $orig = Join-Path $src $_.Name
    $origSize = if (Test-Path $orig) { [math]::Round((Get-Item $orig).Length / 1MB, 2) } else { "n/a" }
    "{0,-22} {1,8} MB  ->  {2,8} MB" -f $_.Name, $origSize, [math]::Round($_.Length / 1MB, 2)
}
