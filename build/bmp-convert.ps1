Add-Type -AssemblyName System.Drawing
function Convert-ToBmp([string]$Png, [string]$Bmp) {
  $img = [System.Drawing.Bitmap]::FromFile($Png)
  $bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
  $g.Dispose(); $img.Dispose()
  $bmp.Save($Bmp, [System.Drawing.Imaging.ImageFormat]::Bmp)
  $bmp.Dispose()
  Write-Output ("wrote " + $Bmp)
}
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Convert-ToBmp (Join-Path $here "installer-header.png") (Join-Path $here "installer-header.bmp")
Convert-ToBmp (Join-Path $here "installer-sidebar.png") (Join-Path $here "installer-sidebar.bmp")
