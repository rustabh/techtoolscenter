import type { UiSnippet } from "./ui-snippets";

export const snippets: UiSnippet[] = [
  {
    "id": "btn-primary",
    "name": "Primary Button",
    "category": "Buttons",
    "html": "<button class=\"btn\">Get Started</button>",
    "css": "\n.btn {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #ffffff;\n  background: #4f46e5;\n  border: none;\n  border-radius: 10px;\n  padding: 12px 26px;\n  cursor: pointer;\n  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35), 0 1px 2px rgba(0, 0, 0, 0.08);\n  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;\n  letter-spacing: 0.2px;\n}\n.btn:hover {\n  background: #433bd1;\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.45), 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.btn:active {\n  transform: translateY(0);\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);\n}\n"
  },
  {
    "id": "btn-outline",
    "name": "Outline Button",
    "category": "Buttons",
    "html": "<button class=\"btn-outline\">Learn More</button>",
    "css": "\n.btn-outline {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #0ea5a3;\n  background: transparent;\n  border: 2px solid #0ea5a3;\n  border-radius: 10px;\n  padding: 10px 24px;\n  cursor: pointer;\n  transition: background 0.2s ease, color 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;\n}\n.btn-outline:hover {\n  background: #0ea5a3;\n  color: #ffffff;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(14, 165, 163, 0.3);\n}\n.btn-outline:active {\n  transform: translateY(0);\n}\n"
  },
  {
    "id": "btn-ghost",
    "name": "Ghost Button",
    "category": "Buttons",
    "html": "<button class=\"btn-ghost\">Cancel</button>",
    "css": "\n.btn-ghost {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #475569;\n  background: transparent;\n  border: none;\n  border-radius: 10px;\n  padding: 11px 22px;\n  cursor: pointer;\n  transition: background 0.18s ease, color 0.18s ease;\n}\n.btn-ghost:hover {\n  background: rgba(71, 85, 105, 0.08);\n  color: #1e293b;\n}\n.btn-ghost:active {\n  background: rgba(71, 85, 105, 0.14);\n}\n"
  },
  {
    "id": "btn-gradient",
    "name": "Gradient Button",
    "category": "Buttons",
    "html": "<button class=\"btn-gradient\">Upgrade Now</button>",
    "css": "\n.btn-gradient {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #ffffff;\n  border: none;\n  border-radius: 10px;\n  padding: 12px 28px;\n  cursor: pointer;\n  background: linear-gradient(90deg, #6366f1 0%, #ec4899 100%);\n  background-size: 160% 160%;\n  background-position: 0% 50%;\n  box-shadow: 0 6px 18px rgba(236, 72, 153, 0.3);\n  transition: background-position 0.35s ease, transform 0.18s ease, box-shadow 0.25s ease;\n}\n.btn-gradient:hover {\n  background-position: 100% 50%;\n  transform: translateY(-2px);\n  box-shadow: 0 10px 24px rgba(236, 72, 153, 0.4);\n}\n.btn-gradient:active {\n  transform: translateY(0);\n}\n"
  },
  {
    "id": "btn-3d",
    "name": "Neumorphic Button",
    "category": "Buttons",
    "html": "<div class=\"neo-wrap\">\n  <button class=\"btn-neo\">Press Me</button>\n</div>",
    "css": "\n.neo-wrap {\n  display: inline-flex;\n  padding: 30px;\n  background: #e6e9ef;\n  border-radius: 24px;\n}\n.btn-neo {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: #4b5563;\n  background: #e6e9ef;\n  border: none;\n  border-radius: 14px;\n  padding: 14px 30px;\n  cursor: pointer;\n  box-shadow: 8px 8px 16px #c5c9d1, -8px -8px 16px #ffffff;\n  transition: box-shadow 0.15s ease, transform 0.15s ease, color 0.15s ease;\n}\n.btn-neo:hover {\n  color: #4f46e5;\n}\n.btn-neo:active {\n  box-shadow: inset 6px 6px 12px #c5c9d1, inset -6px -6px 12px #ffffff;\n  transform: translateY(1px);\n}\n"
  },
  {
    "id": "toggle-ios",
    "name": "iOS-Style Toggle",
    "category": "Toggle Switches",
    "html": "<div class=\"toggle-ios-wrap\">\n  <input type=\"checkbox\" id=\"toggle-ios\" class=\"toggle-ios-input\" checked>\n  <label for=\"toggle-ios\" class=\"toggle-ios-label\"></label>\n</div>",
    "css": "\n.toggle-ios-wrap {\n  display: inline-flex;\n  align-items: center;\n}\n.toggle-ios-input {\n  display: none;\n}\n.toggle-ios-label {\n  position: relative;\n  display: inline-block;\n  width: 52px;\n  height: 30px;\n  background: #d1d5db;\n  border-radius: 999px;\n  cursor: pointer;\n  transition: background 0.25s ease;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);\n}\n.toggle-ios-label::after {\n  content: \"\";\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 24px;\n  height: 24px;\n  background: #ffffff;\n  border-radius: 50%;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);\n  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.toggle-ios-input:checked + .toggle-ios-label {\n  background: #34c759;\n}\n.toggle-ios-input:checked + .toggle-ios-label::after {\n  transform: translateX(22px);\n}\n"
  },
  {
    "id": "toggle-dark-mode",
    "name": "Dark Mode Toggle",
    "category": "Toggle Switches",
    "html": "<div class=\"dm-wrap\">\n  <input type=\"checkbox\" id=\"dm-toggle\" class=\"dm-input\">\n  <label for=\"dm-toggle\" class=\"dm-label\">\n    <span class=\"dm-icon dm-sun\">☀</span>\n    <span class=\"dm-icon dm-moon\">☾</span>\n    <span class=\"dm-thumb\"></span>\n  </label>\n</div>",
    "css": "\n.dm-wrap {\n  display: inline-flex;\n  align-items: center;\n}\n.dm-input {\n  display: none;\n}\n.dm-label {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  width: 64px;\n  height: 32px;\n  border-radius: 999px;\n  background: linear-gradient(180deg, #87ceeb, #5aa9d6);\n  cursor: pointer;\n  padding: 0 8px;\n  box-sizing: border-box;\n  transition: background 0.35s ease;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);\n}\n.dm-icon {\n  position: relative;\n  z-index: 1;\n  font-size: 14px;\n  line-height: 1;\n  width: 16px;\n  text-align: center;\n  transition: opacity 0.3s ease, transform 0.3s ease;\n}\n.dm-sun {\n  color: #ffb703;\n  opacity: 1;\n  transform: scale(1);\n}\n.dm-moon {\n  color: #e2e8f0;\n  opacity: 0.4;\n  transform: scale(0.85);\n  margin-left: auto;\n}\n.dm-thumb {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 26px;\n  height: 26px;\n  background: #ffffff;\n  border-radius: 50%;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.dm-input:checked + .dm-label {\n  background: linear-gradient(180deg, #1e293b, #0f172a);\n}\n.dm-input:checked + .dm-label .dm-thumb {\n  transform: translateX(32px);\n}\n.dm-input:checked + .dm-label .dm-sun {\n  opacity: 0.4;\n  transform: scale(0.85);\n}\n.dm-input:checked + .dm-label .dm-moon {\n  opacity: 1;\n  transform: scale(1);\n  color: #f1f5f9;\n}\n"
  },
  {
    "id": "toggle-labeled",
    "name": "Labeled Toggle",
    "category": "Toggle Switches",
    "html": "<div class=\"lt-wrap\">\n  <input type=\"checkbox\" id=\"lt-toggle\" class=\"lt-input\" checked>\n  <label for=\"lt-toggle\" class=\"lt-label\">\n    <span class=\"lt-text lt-on\">On</span>\n    <span class=\"lt-text lt-off\">Off</span>\n    <span class=\"lt-thumb\"></span>\n  </label>\n</div>",
    "css": "\n.lt-wrap {\n  display: inline-flex;\n  align-items: center;\n}\n.lt-input {\n  display: none;\n}\n.lt-label {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  width: 84px;\n  height: 34px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  cursor: pointer;\n  box-sizing: border-box;\n  transition: background 0.25s ease;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);\n  overflow: hidden;\n}\n.lt-text {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 12px;\n  font-weight: 700;\n  color: #ffffff;\n  letter-spacing: 0.3px;\n  transition: opacity 0.2s ease;\n}\n.lt-on {\n  left: 10px;\n  opacity: 0;\n}\n.lt-off {\n  right: 10px;\n  color: #64748b;\n  opacity: 1;\n}\n.lt-thumb {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 28px;\n  height: 28px;\n  background: #ffffff;\n  border-radius: 50%;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);\n  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 1;\n}\n.lt-input:checked + .lt-label {\n  background: #22c55e;\n}\n.lt-input:checked + .lt-label .lt-thumb {\n  transform: translateX(50px);\n}\n.lt-input:checked + .lt-label .lt-on {\n  opacity: 1;\n}\n.lt-input:checked + .lt-label .lt-off {\n  opacity: 0;\n}\n"
  },
  {
    "id": "toggle-square",
    "name": "Square Toggle",
    "category": "Toggle Switches",
    "html": "<div class=\"sq-wrap\">\n  <input type=\"checkbox\" id=\"sq-toggle\" class=\"sq-input\" checked>\n  <label for=\"sq-toggle\" class=\"sq-label\"></label>\n</div>",
    "css": "\n.sq-wrap {\n  display: inline-flex;\n  align-items: center;\n}\n.sq-input {\n  display: none;\n}\n.sq-label {\n  position: relative;\n  display: inline-block;\n  width: 56px;\n  height: 28px;\n  background: #e2e8f0;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.22s ease;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.sq-label::after {\n  content: \"\";\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 22px;\n  height: 22px;\n  background: #ffffff;\n  border-radius: 4px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n  transition: transform 0.22s ease;\n}\n.sq-input:checked + .sq-label {\n  background: #f97316;\n}\n.sq-input:checked + .sq-label::after {\n  transform: translateX(26px);\n}\n"
  },
  {
    "id": "slider-basic",
    "name": "Basic Slider",
    "category": "Range Sliders",
    "html": "<input type=\"range\" min=\"0\" max=\"100\" value=\"40\" class=\"slider-basic\">",
    "css": "\n.slider-basic {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 240px;\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  outline: none;\n  cursor: pointer;\n}\n.slider-basic::-webkit-slider-runnable-track {\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n}\n.slider-basic::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #4f46e5;\n  margin-top: -7px;\n  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.45);\n  border: 3px solid #ffffff;\n  transition: transform 0.15s ease;\n}\n.slider-basic::-webkit-slider-thumb:hover {\n  transform: scale(1.1);\n}\n.slider-basic::-moz-range-track {\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n}\n.slider-basic::-moz-range-thumb {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #4f46e5;\n  border: 3px solid #ffffff;\n  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.45);\n}\n"
  },
  {
    "id": "slider-gradient-track",
    "name": "Gradient Track Slider",
    "category": "Range Sliders",
    "html": "<input type=\"range\" min=\"0\" max=\"100\" value=\"60\" class=\"slider-gradient\">",
    "css": "\n.slider-gradient {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 240px;\n  height: 8px;\n  border-radius: 999px;\n  outline: none;\n  cursor: pointer;\n  background: linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%);\n}\n.slider-gradient::-webkit-slider-runnable-track {\n  height: 8px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%);\n}\n.slider-gradient::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: #ffffff;\n  margin-top: -7px;\n  border: 3px solid #1e293b;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);\n  transition: transform 0.15s ease;\n}\n.slider-gradient::-webkit-slider-thumb:hover {\n  transform: scale(1.1);\n}\n.slider-gradient::-moz-range-track {\n  height: 8px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #22c55e 0%, #eab308 50%, #ef4444 100%);\n}\n.slider-gradient::-moz-range-thumb {\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: #ffffff;\n  border: 3px solid #1e293b;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);\n}\n"
  },
  {
    "id": "slider-value-bubble",
    "name": "Slider with Value Bubble",
    "category": "Range Sliders",
    "html": "<!-- Static visual example only: the bubble is positioned with fixed CSS (left: 50%)\n     to sit above the thumb at value 50 on a 0-100 range. It does not move\n     dynamically since no JavaScript is used. -->\n<div class=\"bubble-wrap\">\n  <div class=\"bubble\">50</div>\n  <input type=\"range\" min=\"0\" max=\"100\" value=\"50\" class=\"slider-bubble\">\n</div>",
    "css": "\n.bubble-wrap {\n  position: relative;\n  width: 240px;\n  padding-top: 34px;\n}\n.bubble {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #1e293b;\n  color: #ffffff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 12px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 6px;\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);\n}\n.bubble::after {\n  content: \"\";\n  position: absolute;\n  bottom: -5px;\n  left: 50%;\n  transform: translateX(-50%);\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid #1e293b;\n}\n.slider-bubble {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  outline: none;\n  cursor: pointer;\n}\n.slider-bubble::-webkit-slider-runnable-track {\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n}\n.slider-bubble::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #1e293b;\n  margin-top: -6px;\n  border: 3px solid #ffffff;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);\n}\n.slider-bubble::-moz-range-track {\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n}\n.slider-bubble::-moz-range-thumb {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #1e293b;\n  border: 3px solid #ffffff;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);\n}\n"
  },
  {
    "id": "slider-thick",
    "name": "Thick Modern Slider",
    "category": "Range Sliders",
    "html": "<input type=\"range\" min=\"0\" max=\"100\" value=\"70\" class=\"slider-thick\">",
    "css": "\n.slider-thick {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 260px;\n  height: 14px;\n  border-radius: 999px;\n  background: #d9f2e6;\n  outline: none;\n  cursor: pointer;\n}\n.slider-thick::-webkit-slider-runnable-track {\n  height: 14px;\n  border-radius: 999px;\n  background: #d9f2e6;\n}\n.slider-thick::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: #10b981;\n  margin-top: -8px;\n  border: 4px solid #ffffff;\n  box-shadow: 0 3px 10px rgba(16, 185, 129, 0.5);\n  transition: transform 0.15s ease;\n}\n.slider-thick::-webkit-slider-thumb:hover {\n  transform: scale(1.08);\n}\n.slider-thick::-moz-range-track {\n  height: 14px;\n  border-radius: 999px;\n  background: #d9f2e6;\n}\n.slider-thick::-moz-range-thumb {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: #10b981;\n  border: 4px solid #ffffff;\n  box-shadow: 0 3px 10px rgba(16, 185, 129, 0.5);\n}\n"
  },
  {
    "id": "card-simple",
    "name": "Simple Card",
    "category": "Cards",
    "html": "<div class=\"simple-card\">\n  <h3 class=\"simple-card-title\">Effortless Workflows</h3>\n  <p class=\"simple-card-text\">Streamline your daily tasks with a clean, focused interface that gets out of your way and lets you get things done.</p>\n</div>",
    "css": ".simple-card {\n  width: 320px;\n  padding: 28px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 16px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 12px rgba(16, 24, 40, 0.06);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  transition: box-shadow 0.25s ease, transform 0.25s ease;\n}\n\n.simple-card:hover {\n  box-shadow: 0 4px 8px rgba(16, 24, 40, 0.06), 0 12px 24px rgba(16, 24, 40, 0.1);\n  transform: translateY(-2px);\n}\n\n.simple-card-title {\n  margin: 0 0 10px 0;\n  font-size: 18px;\n  font-weight: 650;\n  color: #111827;\n  letter-spacing: -0.01em;\n}\n\n.simple-card-text {\n  margin: 0;\n  font-size: 14px;\n  line-height: 1.6;\n  color: #6b7280;\n}"
  },
  {
    "id": "card-image",
    "name": "Image Card",
    "category": "Cards",
    "html": "<div class=\"image-card\">\n  <div class=\"image-card-media\"></div>\n  <div class=\"image-card-body\">\n    <h3 class=\"image-card-title\">Mountain Retreat</h3>\n    <p class=\"image-card-text\">A quiet escape surrounded by pine forests and crisp alpine air, perfect for weekend recharge.</p>\n  </div>\n</div>",
    "css": ".image-card {\n  width: 300px;\n  background: #ffffff;\n  border-radius: 18px;\n  overflow: hidden;\n  box-shadow: 0 2px 4px rgba(16, 24, 40, 0.04), 0 8px 20px rgba(16, 24, 40, 0.08);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  transition: box-shadow 0.25s ease, transform 0.25s ease;\n}\n\n.image-card:hover {\n  box-shadow: 0 6px 12px rgba(16, 24, 40, 0.08), 0 16px 32px rgba(16, 24, 40, 0.12);\n  transform: translateY(-3px);\n}\n\n.image-card-media {\n  height: 160px;\n  width: 100%;\n  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);\n}\n\n.image-card-body {\n  padding: 20px 22px 24px 22px;\n}\n\n.image-card-title {\n  margin: 0 0 8px 0;\n  font-size: 17px;\n  font-weight: 650;\n  color: #111827;\n}\n\n.image-card-text {\n  margin: 0;\n  font-size: 13.5px;\n  line-height: 1.6;\n  color: #6b7280;\n}"
  },
  {
    "id": "card-pricing",
    "name": "Pricing Card",
    "category": "Cards",
    "html": "<div class=\"pricing-card\">\n  <div class=\"pricing-plan\">Pro Plan</div>\n  <div class=\"pricing-price\">$29<span class=\"pricing-period\">/mo</span></div>\n  <ul class=\"pricing-features\">\n    <li><span class=\"pricing-check\">✓</span> Unlimited projects</li>\n    <li><span class=\"pricing-check\">✓</span> Priority support</li>\n    <li><span class=\"pricing-check\">✓</span> Advanced analytics</li>\n  </ul>\n  <button class=\"pricing-cta\">Get Started</button>\n</div>",
    "css": ".pricing-card {\n  width: 280px;\n  padding: 32px 28px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 20px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.08);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  text-align: center;\n}\n\n.pricing-plan {\n  font-size: 13px;\n  font-weight: 650;\n  color: #7c3aed;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  margin-bottom: 12px;\n}\n\n.pricing-price {\n  font-size: 42px;\n  font-weight: 750;\n  color: #111827;\n  letter-spacing: -0.02em;\n  margin-bottom: 20px;\n}\n\n.pricing-period {\n  font-size: 15px;\n  font-weight: 500;\n  color: #9ca3af;\n}\n\n.pricing-features {\n  list-style: none;\n  margin: 0 0 24px 0;\n  padding: 0;\n  text-align: left;\n}\n\n.pricing-features li {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 14px;\n  color: #374151;\n  padding: 8px 0;\n  border-bottom: 1px solid #f3f4f6;\n}\n\n.pricing-features li:last-child {\n  border-bottom: none;\n}\n\n.pricing-check {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #ede9fe;\n  color: #7c3aed;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.pricing-cta {\n  width: 100%;\n  padding: 12px 0;\n  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);\n  color: #ffffff;\n  border: none;\n  border-radius: 12px;\n  font-size: 14.5px;\n  font-weight: 650;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.pricing-cta:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.4);\n}"
  },
  {
    "id": "card-profile",
    "name": "Profile Card",
    "category": "Cards",
    "html": "<div class=\"profile-card\">\n  <div class=\"profile-avatar\">JD</div>\n  <h3 class=\"profile-name\">Jane Doe</h3>\n  <p class=\"profile-role\">Senior Product Designer</p>\n</div>",
    "css": ".profile-card {\n  width: 260px;\n  padding: 36px 24px 28px 24px;\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 18px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 20px rgba(16, 24, 40, 0.07);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\n.profile-avatar {\n  width: 84px;\n  height: 84px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #f472b6 0%, #fb923c 100%);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 26px;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  box-shadow: 0 4px 14px rgba(251, 146, 60, 0.35);\n  margin-bottom: 16px;\n}\n\n.profile-name {\n  margin: 0 0 4px 0;\n  font-size: 18px;\n  font-weight: 650;\n  color: #111827;\n}\n\n.profile-role {\n  margin: 0;\n  font-size: 13.5px;\n  color: #6b7280;\n}"
  },
  {
    "id": "badge-solid",
    "name": "Solid Badge",
    "category": "Badges & Tags",
    "html": "<span class=\"solid-badge\">New</span>",
    "css": ".solid-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 12px;\n  background: #4f46e5;\n  color: #ffffff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 12.5px;\n  font-weight: 650;\n  border-radius: 999px;\n  letter-spacing: 0.01em;\n  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);\n}"
  },
  {
    "id": "badge-outline",
    "name": "Outline Badge",
    "category": "Badges & Tags",
    "html": "<span class=\"outline-badge\">Beta</span>",
    "css": ".outline-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 3px 12px;\n  background: transparent;\n  color: #4f46e5;\n  border: 1.5px solid #4f46e5;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 12.5px;\n  font-weight: 650;\n  border-radius: 999px;\n  letter-spacing: 0.01em;\n}"
  },
  {
    "id": "badge-status-dot",
    "name": "Status Badge",
    "category": "Badges & Tags",
    "html": "<span class=\"status-badge\">\n  <span class=\"status-dot\"></span>\n  Online\n</span>",
    "css": ".status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 5px 12px 5px 10px;\n  background: #f0fdf4;\n  color: #15803d;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 13px;\n  font-weight: 600;\n  border-radius: 999px;\n  border: 1px solid #bbf7d0;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #22c55e;\n  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);\n}"
  },
  {
    "id": "badge-count",
    "name": "Notification Count Badge",
    "category": "Badges & Tags",
    "html": "<div class=\"count-badge-wrap\">\n  <div class=\"count-badge-icon\">🔔</div>\n  <span class=\"count-badge\">3</span>\n</div>",
    "css": ".count-badge-wrap {\n  position: relative;\n  display: inline-flex;\n  width: 46px;\n  height: 46px;\n}\n\n.count-badge-icon {\n  width: 46px;\n  height: 46px;\n  border-radius: 12px;\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n}\n\n.count-badge {\n  position: absolute;\n  top: -6px;\n  right: -6px;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #ef4444;\n  color: #ffffff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 11px;\n  font-weight: 700;\n  border-radius: 999px;\n  border: 2px solid #ffffff;\n  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.4);\n}"
  },
  {
    "id": "badge-gradient",
    "name": "Gradient Badge",
    "category": "Badges & Tags",
    "html": "<span class=\"gradient-badge\">Pro</span>",
    "css": ".gradient-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 14px;\n  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%);\n  color: #ffffff;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 12.5px;\n  font-weight: 700;\n  border-radius: 999px;\n  letter-spacing: 0.02em;\n  box-shadow: 0 3px 10px rgba(236, 72, 153, 0.35);\n}"
  },
  {
    "id": "avatar-initials",
    "name": "Initials Avatar",
    "category": "Avatars",
    "html": "<div class=\"initials-avatar\">AK</div>",
    "css": ".initials-avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 18px;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.35);\n}"
  },
  {
    "id": "avatar-square",
    "name": "Rounded Square Avatar",
    "category": "Avatars",
    "html": "<div class=\"square-avatar\">RS</div>",
    "css": ".square-avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #22c55e 0%, #14b8a6 100%);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 18px;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  box-shadow: 0 3px 10px rgba(20, 184, 166, 0.35);\n}"
  },
  {
    "id": "avatar-status",
    "name": "Avatar with Status Dot",
    "category": "Avatars",
    "html": "<div class=\"status-avatar-wrap\">\n  <div class=\"status-avatar\">MT</div>\n  <span class=\"status-avatar-dot\"></span>\n</div>",
    "css": ".status-avatar-wrap {\n  position: relative;\n  display: inline-flex;\n  width: 56px;\n  height: 56px;\n}\n\n.status-avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  font-size: 18px;\n  font-weight: 700;\n  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.35);\n}\n\n.status-avatar-dot {\n  position: absolute;\n  bottom: 1px;\n  right: 1px;\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: #22c55e;\n  border: 2.5px solid #ffffff;\n}"
  },
  {
    "id": "avatar-group",
    "name": "Avatar Group Stack",
    "category": "Avatars",
    "html": "<div class=\"avatar-group\">\n  <div class=\"avatar-group-item\" style=\"background: linear-gradient(135deg, #f97316, #ea580c);\">JD</div>\n  <div class=\"avatar-group-item\" style=\"background: linear-gradient(135deg, #3b82f6, #2563eb);\">MK</div>\n  <div class=\"avatar-group-item\" style=\"background: linear-gradient(135deg, #22c55e, #16a34a);\">SR</div>\n  <div class=\"avatar-group-item avatar-group-more\">+5</div>\n</div>",
    "css": ".avatar-group {\n  display: flex;\n  align-items: center;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n\n.avatar-group-item {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 700;\n  border: 3px solid #ffffff;\n  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.15);\n  margin-left: -12px;\n}\n\n.avatar-group-item:first-child {\n  margin-left: 0;\n}\n\n.avatar-group-more {\n  background: #e5e7eb;\n  color: #4b5563;\n  font-size: 12px;\n}"
  },
  {
    "id": "loader-spin",
    "name": "Spinning Circle",
    "category": "Loaders & Spinners",
    "html": "<div class=\"spin-loader\"></div>",
    "css": "\n.spin-loader {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 4px solid rgba(99, 102, 241, 0.15);\n  border-top-color: #6366f1;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);\n  animation: spin-loader-rotate 0.8s linear infinite;\n}\n\n@keyframes spin-loader-rotate {\n  to { transform: rotate(360deg); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .spin-loader {\n    animation-duration: 2.4s;\n  }\n}\n"
  },
  {
    "id": "loader-dots",
    "name": "Bouncing Dots",
    "category": "Loaders & Spinners",
    "html": "<div class=\"dots-loader\">\n  <span class=\"dots-loader-dot\"></span>\n  <span class=\"dots-loader-dot\"></span>\n  <span class=\"dots-loader-dot\"></span>\n</div>",
    "css": "\n.dots-loader {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.dots-loader-dot {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #6366f1, #8b5cf6);\n  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.35);\n  animation: dots-loader-bounce 1s ease-in-out infinite;\n}\n\n.dots-loader-dot:nth-child(1) { animation-delay: 0s; }\n.dots-loader-dot:nth-child(2) { animation-delay: 0.15s; }\n.dots-loader-dot:nth-child(3) { animation-delay: 0.3s; }\n\n@keyframes dots-loader-bounce {\n  0%, 80%, 100% {\n    transform: scale(0.6) translateY(0);\n    opacity: 0.5;\n  }\n  40% {\n    transform: scale(1) translateY(-10px);\n    opacity: 1;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dots-loader-dot {\n    animation-duration: 2.4s;\n  }\n}\n"
  },
  {
    "id": "loader-pulse",
    "name": "Pulse Loader",
    "category": "Loaders & Spinners",
    "html": "<div class=\"pulse-loader\">\n  <span class=\"pulse-loader-ring\"></span>\n  <span class=\"pulse-loader-core\"></span>\n</div>",
    "css": "\n.pulse-loader {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.pulse-loader-core {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: #10b981;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);\n  z-index: 1;\n}\n\n.pulse-loader-ring {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: #10b981;\n  opacity: 0.6;\n  animation: pulse-loader-expand 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n\n@keyframes pulse-loader-expand {\n  0% {\n    transform: scale(0.35);\n    opacity: 0.55;\n  }\n  70% {\n    transform: scale(1);\n    opacity: 0;\n  }\n  100% {\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .pulse-loader-ring {\n    animation-duration: 3.2s;\n  }\n}\n"
  },
  {
    "id": "loader-skeleton",
    "name": "Skeleton Loading Bar",
    "category": "Loaders & Spinners",
    "html": "<div class=\"skeleton-loader\">\n  <div class=\"skeleton-loader-line skeleton-loader-line--title\"></div>\n  <div class=\"skeleton-loader-line skeleton-loader-line--full\"></div>\n  <div class=\"skeleton-loader-line skeleton-loader-line--short\"></div>\n</div>",
    "css": "\n.skeleton-loader {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  width: 260px;\n}\n\n.skeleton-loader-line {\n  height: 14px;\n  border-radius: 7px;\n  background: linear-gradient(\n    90deg,\n    #e5e7eb 0%,\n    #f3f4f6 20%,\n    #e5e7eb 40%,\n    #e5e7eb 100%\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loader-shimmer 1.4s ease-in-out infinite;\n}\n\n.skeleton-loader-line--title {\n  width: 55%;\n  height: 18px;\n}\n\n.skeleton-loader-line--full {\n  width: 100%;\n}\n\n.skeleton-loader-line--short {\n  width: 75%;\n}\n\n@keyframes skeleton-loader-shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-loader-line {\n    animation-duration: 3.5s;\n  }\n}\n"
  },
  {
    "id": "loader-gradient-ring",
    "name": "Gradient Ring Spinner",
    "category": "Loaders & Spinners",
    "html": "<div class=\"gradient-ring-loader\"></div>",
    "css": "\n.gradient-ring-loader {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  padding: 4px;\n  background: conic-gradient(\n    from 0deg,\n    #6366f1 0%,\n    #8b5cf6 30%,\n    #ec4899 60%,\n    rgba(236, 72, 153, 0) 100%\n  );\n  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px));\n  mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px));\n  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);\n  animation: gradient-ring-loader-spin 1s linear infinite;\n}\n\n@keyframes gradient-ring-loader-spin {\n  to { transform: rotate(360deg); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .gradient-ring-loader {\n    animation-duration: 2.6s;\n  }\n}\n"
  },
  {
    "id": "alert-success",
    "name": "Success Alert",
    "category": "Alerts & Toasts",
    "html": "<div class=\"ui-alert ui-alert--success\">\n  <div class=\"ui-alert-icon\">✓</div>\n  <div class=\"ui-alert-body\">\n    <p class=\"ui-alert-title\">Payment successful</p>\n    <p class=\"ui-alert-desc\">Your transaction has been completed and a receipt was sent to your email.</p>\n  </div>\n</div>",
    "css": "\n.ui-alert {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  max-width: 420px;\n  padding: 14px 16px;\n  border-radius: 10px;\n  background: #ecfdf5;\n  border-left: 4px solid #10b981;\n  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.12);\n}\n\n.ui-alert--success .ui-alert-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #10b981;\n  color: #ffffff;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.ui-alert-body {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.ui-alert-title {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #065f46;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n\n.ui-alert-desc {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.45;\n  color: #047857;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n"
  },
  {
    "id": "alert-error",
    "name": "Error Alert",
    "category": "Alerts & Toasts",
    "html": "<div class=\"ui-alert ui-alert--error\">\n  <div class=\"ui-alert-icon\">×</div>\n  <div class=\"ui-alert-body\">\n    <p class=\"ui-alert-title\">Payment failed</p>\n    <p class=\"ui-alert-desc\">We couldn't process your card. Please check your details and try again.</p>\n  </div>\n</div>",
    "css": "\n.ui-alert {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  max-width: 420px;\n  padding: 14px 16px;\n  border-radius: 10px;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n}\n\n.ui-alert--error {\n  background: #fef2f2;\n  border-left: 4px solid #ef4444;\n  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.12);\n}\n\n.ui-alert--error .ui-alert-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #ef4444;\n  color: #ffffff;\n  font-size: 15px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.ui-alert-body {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.ui-alert-title {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #991b1b;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n\n.ui-alert-desc {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.45;\n  color: #b91c1c;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n"
  },
  {
    "id": "alert-warning",
    "name": "Warning / Info Alert",
    "category": "Alerts & Toasts",
    "html": "<div class=\"ui-alert ui-alert--warning\">\n  <div class=\"ui-alert-icon\">i</div>\n  <div class=\"ui-alert-body\">\n    <p class=\"ui-alert-title\">Scheduled maintenance</p>\n    <p class=\"ui-alert-desc\">Services may be briefly unavailable tonight between 11 PM and 1 AM.</p>\n  </div>\n</div>",
    "css": "\n.ui-alert {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  max-width: 420px;\n  padding: 14px 16px;\n  border-radius: 10px;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n}\n\n.ui-alert--warning {\n  background: #fffbeb;\n  border-left: 4px solid #f59e0b;\n  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.12);\n}\n\n.ui-alert--warning .ui-alert-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  background: #f59e0b;\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 700;\n  font-style: italic;\n  font-family: Georgia, \"Times New Roman\", serif;\n  line-height: 1;\n}\n\n.ui-alert-body {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.ui-alert-title {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #92400e;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n\n.ui-alert-desc {\n  margin: 0;\n  font-size: 13px;\n  line-height: 1.45;\n  color: #b45309;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n"
  },
  {
    "id": "alert-toast",
    "name": "Toast Notification",
    "category": "Alerts & Toasts",
    "html": "<div class=\"ui-toast\">\n  <div class=\"ui-toast-icon\">✓</div>\n  <div class=\"ui-toast-body\">\n    <p class=\"ui-toast-title\">Changes saved</p>\n    <p class=\"ui-toast-desc\">Your profile has been updated.</p>\n  </div>\n  <button class=\"ui-toast-close\" type=\"button\" aria-label=\"Dismiss\">×</button>\n</div>",
    "css": "\n.ui-toast {\n  position: relative;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  width: 300px;\n  padding: 14px 32px 14px 14px;\n  border-radius: 12px;\n  background: #ffffff;\n  box-shadow:\n    0 10px 30px rgba(15, 23, 42, 0.14),\n    0 2px 8px rgba(15, 23, 42, 0.08);\n  border: 1px solid rgba(15, 23, 42, 0.06);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n\n.ui-toast-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  background: #10b981;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 700;\n  margin-top: 1px;\n}\n\n.ui-toast-body {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.ui-toast-title {\n  margin: 0;\n  font-size: 13.5px;\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.ui-toast-desc {\n  margin: 0;\n  font-size: 12.5px;\n  line-height: 1.4;\n  color: #64748b;\n}\n\n.ui-toast-close {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 20px;\n  height: 20px;\n  border: none;\n  background: transparent;\n  color: #94a3b8;\n  font-size: 15px;\n  line-height: 1;\n  cursor: pointer;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n\n.ui-toast-close:hover {\n  background: #f1f5f9;\n  color: #334155;\n}\n"
  }
];
