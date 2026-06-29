import { Dish } from "../data";

/**
 * Generates a high-quality 1080x1920 (9:16) image of a dish and triggers sharing or download.
 */
export async function shareDish(dish: Dish): Promise<{ success: boolean; method: "share" | "download" }> {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2D context");
  }

  // 1. Draw Background
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 1080, 1920);

  // Draw subtle textured/amber gradients
  const bgGrad = ctx.createRadialGradient(540, 960, 100, 540, 960, 1000);
  bgGrad.addColorStop(0, "rgba(94, 25, 20, 0.12)");
  bgGrad.addColorStop(1, "#000000");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Load and Draw Image if available
  let imageLoaded = false;
  if (dish.img) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = dish.img;
      
      // Wait with timeout
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        // 2 second timeout for slow connections
        setTimeout(() => reject(new Error("Timeout")), 2000);
      });

      // Cover scaling calculation
      const canvasRatio = 1080 / 1920;
      const imgRatio = img.width / img.height;
      let drawWidth = 1080;
      let drawHeight = 1920;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = 1920 * imgRatio;
        offsetX = (1080 - drawWidth) / 2;
      } else {
        drawHeight = 1080 / imgRatio;
        offsetY = (1920 - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      imageLoaded = true;
    } catch (e) {
      console.warn("Failed to load dish image for canvas, using fallback graphic.", e);
    }
  }

  // 3. Draw elegant dark overlay gradients for high text contrast
  const scrimGrad = ctx.createLinearGradient(0, 0, 0, 1920);
  scrimGrad.addColorStop(0, "rgba(0, 0, 0, 0.7)");
  scrimGrad.addColorStop(0.2, "rgba(0, 0, 0, 0.2)");
  scrimGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.4)");
  scrimGrad.addColorStop(0.75, "rgba(0, 0, 0, 0.85)");
  scrimGrad.addColorStop(1, "#000000");
  ctx.fillStyle = scrimGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // If no photo was drawn, render a luxury decorative gold/red border
  if (!imageLoaded) {
    ctx.strokeStyle = "#5E1914";
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 1000, 1840);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 960, 1800);
  }

  // 4. Draw Header Branding
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "italic 56px 'Playfair Display', Georgia, serif";
  ctx.fillText("Alma Ibérica", 540, 160);

  ctx.fillStyle = "#5E1914";
  ctx.font = "700 24px 'Inter', sans-serif";
  ctx.fillText("TAPEO SELECTO • SANT BOI", 540, 210);

  // 5. Draw Central Focus / Frame if no photo
  if (!imageLoaded) {
    // Elegant Bulls-eye or Iberian silhouette symbol
    ctx.beginPath();
    ctx.arc(540, 750, 120, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(94, 25, 20, 0.3)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#5E1914";
    ctx.font = "italic 120px 'Playfair Display', Georgia, serif";
    ctx.fillText("AI", 540, 790);
  }

  // 6. Draw Category and Dish Details (Bottom area)
  ctx.textAlign = "left";
  
  // Category Eyebrow
  ctx.fillStyle = "#5E1914";
  ctx.font = "700 32px 'Inter', sans-serif";
  ctx.fillText(dish.cat.toUpperCase(), 100, 1380);

  // Dish Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "italic 76px 'Playfair Display', Georgia, serif";
  
  // Wrap name if too long
  const name = dish.name;
  if (name.length > 22) {
    const words = name.split(" ");
    let line1 = "";
    let line2 = "";
    for (const w of words) {
      if ((line1 + w).length < 18) {
        line1 += (line1 ? " " : "") + w;
      } else {
        line2 += (line2 ? " " : "") + w;
      }
    }
    ctx.fillText(line1, 100, 1470);
    if (line2) {
      ctx.fillText(line2, 100, 1560);
    }
  } else {
    ctx.fillText(name, 100, 1470);
  }

  // Dish Description
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "300 34px 'Inter', sans-serif";
  
  // Custom wrapping for description
  const desc = dish.desc || "Un rincón donde la tradición se encuentra con el producto de calidad.";
  const maxDescWidth = 880;
  const words = desc.split(" ");
  let currentLine = "";
  const lines = [];
  
  for (const w of words) {
    const testLine = currentLine + (currentLine ? " " : "") + w;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxDescWidth && currentLine) {
      lines.push(currentLine);
      currentLine = w;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  // Draw max 2 lines of description
  let descY = 1640;
  for (let i = 0; i < Math.min(lines.length, 2); i++) {
    ctx.fillText(lines[i], 100, descY);
    descY += 46;
  }

  // 7. Draw Price tag
  ctx.textAlign = "right";
  ctx.fillStyle = "#5E1914";
  ctx.font = "700 110px 'Inter', sans-serif";
  ctx.fillText(`${dish.price.toFixed(2)}€`, 980, 1390);

  // 8. Draw Footer / Call to action
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.font = "500 28px 'Inter', sans-serif";
  ctx.fillText("RESERVA TU MESA EN INSTAGRAM • @ALMAIBERICAA", 540, 1830);

  // Convert canvas to Blob
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve({ success: false, method: "download" });
        return;
      }

      const file = new File([blob], `alma-iberica-${dish.key}.png`, { type: "image/png" });
      const shareData = {
        title: `${dish.name} - Alma Ibérica`,
        text: `¡Mira este platazo de Alma Ibérica en Sant Boi! 😍 ${dish.name} por solo ${dish.price.toFixed(2)}€ • @almaibericaa`,
        files: [file],
      };

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share(shareData);
          resolve({ success: true, method: "share" });
          return;
        } catch (e) {
          console.warn("Share API failed or was dismissed, falling back to download", e);
        }
      }

      // Fallback: download file
      const link = document.createElement("a");
      link.download = `alma-iberica-${dish.key}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Copy text to clipboard to give an awesome user experience
      try {
        await navigator.clipboard.writeText(`¡Prueba el plato "${dish.name}" en Alma Ibérica! Dirección: Carrer Lluís Pascual Roca, 38, Sant Boi de Llobregat.`);
      } catch {
        // Ignore clipboard failures gracefully
      }

      resolve({ success: true, method: "download" });
    }, "image/png");
  });
}
