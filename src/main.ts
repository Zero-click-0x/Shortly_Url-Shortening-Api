const hamburger_menu = document.querySelector("#hamburger_menu");
const mobile_Nav = document.querySelector("#mobile__Nav");
let hero_Image = document.querySelector(".hero__Image");

// Toggle mobile menu when hamburger is clicked
hamburger_menu?.addEventListener("click", () => {
  // Toggle visibility
  if (mobile_Nav?.classList.contains("hidden")) {
    mobile_Nav?.classList.remove("hidden");
    mobile_Nav?.classList.add("flex");
    hero_Image?.classList.add("hidden");
  } else {
    mobile_Nav?.classList.add("hidden");
    mobile_Nav?.classList.remove("flex");
    hero_Image?.classList.remove("hidden");
  }
});

/*  API Call Handling */
document
  .querySelector<HTMLButtonElement>(".url button")
  ?.addEventListener("click", async () => {
    const inputEl = document.querySelector<HTMLInputElement>("#input_Url");
    const longUrl = inputEl?.value.trim();

    if (!longUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to shorten: ${response.status}`);
      }
      const shortUrl = await response.text();
      arrUpdate(longUrl, shortUrl);
      updateUI();
    } catch (err) {
      console.error("Error:", err);
    }
  });
interface LinkPair {
  long: string;
  short: string;
}
let arrShortUrl: LinkPair[] = [];
function arrUpdate(long: string, short: string): void {
  if (arrShortUrl.length >= 3) {
    arrShortUrl.shift();
  }
  arrShortUrl.push({ long, short });
}

function updateUI() {
  let container = document.querySelector<HTMLElement>(".url");
  let template = document.querySelector<HTMLElement>(".resultBox");
  document.querySelectorAll(".result-clone").forEach((el) => el.remove());

  arrShortUrl.forEach((link) => {
    if (template !== null) {
      const clone = template.cloneNode(true) as HTMLElement;
      clone.classList.add("result-clone");
      clone.querySelector<HTMLElement>(".displayLongUrl")!.textContent =
        link.long;
      clone.querySelector<HTMLElement>(".displayShortUrl")!.textContent =
        link.short;
      clone
        .querySelector<HTMLElement>(".copyShortUrl")
        ?.addEventListener("click", () => {
          navigator.clipboard.writeText(link.short);
        });
      clone.classList.remove("hidden");
      clone.classList.add("flex");
      container!.appendChild(clone);
    }
  });
}
