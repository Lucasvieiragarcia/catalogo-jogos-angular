import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: 'img[appImagemFallback]',
  standalone: true,
})
export class ImagemFallbackDirective {
  private readonly elemento = inject(ElementRef<HTMLImageElement>);
  private readonly renderer = inject(Renderer2);
  private fallbackAplicado = false;

  @Input() appImagemFallback = 'Jogo';

  @HostListener('error')
  aplicarFallback() {
    if (this.fallbackAplicado) {
      return;
    }

    this.fallbackAplicado = true;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
        <rect width="100%" height="100%" fill="#1e3a8a" />
        <text x="50%" y="50%" fill="#ffffff" font-family="Arial" font-size="42"
          text-anchor="middle" dominant-baseline="middle">Capa indisponível</text>
      </svg>`;
    const imagemFallback = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      svg
    )}`;

    this.renderer.setAttribute(
      this.elemento.nativeElement,
      'src',
      imagemFallback
    );
    this.renderer.setAttribute(
      this.elemento.nativeElement,
      'alt',
      `Capa indisponível para ${this.appImagemFallback}`
    );
  }
}
