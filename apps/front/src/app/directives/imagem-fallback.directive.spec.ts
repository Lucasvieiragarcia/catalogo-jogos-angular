import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagemFallbackDirective } from './imagem-fallback.directive';

@Component({
  standalone: true,
  imports: [ImagemFallbackDirective],
  template: '<img src="endereco-invalido" appImagemFallback="Jogo de teste" />',
})
class ImagemTesteComponent {}

describe('ImagemFallbackDirective', () => {
  let fixture: ComponentFixture<ImagemTesteComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemTesteComponent);
    fixture.detectChanges();
  });

  it('deve substituir uma imagem que não carregou', () => {
    const imagem: HTMLImageElement = fixture.nativeElement.querySelector('img');
    imagem.dispatchEvent(new Event('error'));

    expect(imagem.getAttribute('src')).toContain('data:image/svg+xml');
    expect(imagem.getAttribute('alt')).toContain('Jogo de teste');
  });
});
