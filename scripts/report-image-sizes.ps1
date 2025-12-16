# Reports file size and dimensions for images under images/sections.
# Usage: pwsh scripts/report-image-sizes.ps1 [-OutPath scripts/image-report.csv]

param(
    [string]$OutPath = (Join-Path $PSScriptRoot 'image-report.csv')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot '..\images\sections' | Resolve-Path

$files = Get-ChildItem -Path $root -Recurse -File -Include *.jpg, *.jpeg, *.png, *.webp

$report = foreach ($file in $files) {
    $img = $null
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        [PSCustomObject]@{
            Path      = $file.FullName.Replace((Resolve-Path '..').Path + [IO.Path]::DirectorySeparatorChar, '')
            Width     = $img.Width
            Height    = $img.Height
            Megabytes = [Math]::Round($file.Length / 1MB, 2)
            Format    = $img.RawFormat.ToString()
        }
    }
    catch {
        Write-Warning "Failed to read $($file.FullName): $_"
    }
    finally {
        if ($img) { $img.Dispose() }
    }
}

$sorted = $report | Sort-Object Megabytes -Descending

$sorted | Export-Csv -NoTypeInformation -Path $OutPath

$sorted | Format-Table -AutoSize Path, Megabytes, Width, Height, Format

Write-Host "`nSaved CSV to $OutPath" -ForegroundColor Yellow
