import { Container, Graphics, Text, TextStyle } from 'pixi.js';

const FONT_SIZE = 16;
const FONT_WEIGHT = '600';
const FONT_FAMILY = 'SF Pro, system-ui, sans-serif';
const PADDING_X = 6;
const PADDING_Y = 3;
const BORDER_RADIUS = 8;
const MIN_WIDTH = 48;
const SHADOW_OFFSET_Y = 2;

/**
 * NameTagVisual renders a rounded nameplate beneath avatars.
 */
export class NameTagVisual extends Container {
  private background: Graphics;
  private shadow: Graphics;
  private text: Text;

  constructor() {
    super();

    this.shadow = new Graphics();
    this.addChild(this.shadow);

    this.background = new Graphics();
    this.addChild(this.background);

    this.text = new Text({
      text: '',
      style: new TextStyle({
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE,
        fontWeight: FONT_WEIGHT,
        fill: '#ffffff',
        align: 'center',
      }),
    });
    this.text.anchor.set(0.5);
    this.addChild(this.text);

    this.visible = false;
  }

  /**
   * Updates the displayed name and colors for the plate.
   *
   * @param name - Player display name to render
   * @param textColor - Text fill color
   * @param backgroundColor - Background fill color
   */
  setContent(name: string, textColor: string, backgroundColor: string): void {
    this.text.text = name;
    this.text.style.fill = textColor;

    const width = Math.max(MIN_WIDTH, this.text.width + PADDING_X * 2);
    const height = this.text.height + PADDING_Y * 2;

    // Set pivot to top-center so the nametag is positioned by its top edge
    // This makes it "hang" from the position point
    this.pivot.set(0, -height / 2);

    this.redraw(width, height, backgroundColor);
  }

  /**
   * Shows the nameplate.
   */
  show(): void {
    this.visible = true;
  }

  /**
   * Hides the nameplate.
   */
  hide(): void {
    this.visible = false;
  }

  private redraw(width: number, height: number, backgroundColor: string): void {
    const x = -width / 2;
    const y = -height / 2;

    this.shadow.clear();
    this.shadow.fillStyle = 'rgba(0,0,0,0.12)';
    this.shadow.roundRect(x, y + SHADOW_OFFSET_Y, width, height, BORDER_RADIUS);
    this.shadow.fill();

    this.background.clear();
    this.background.fillStyle = backgroundColor;
    this.background.roundRect(x, y, width, height, BORDER_RADIUS);
    this.background.fill();
  }
}
