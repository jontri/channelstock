import { Pipe, PipeTransform } from '@angular/core';
import { ResponsiveService } from '@shared/services';

@Pipe({
  name: 'romMobileOrDesktop'
})
export class RomMobileOrDesktopPipe implements PipeTransform {
  constructor(
    private responsiveService: ResponsiveService
  ) { }

  transform(value: string): string {
    if (value) {
      const tag = this.responsiveService.isMobile ? 'rom\\-mobile' : 'rom\\-desktop';
      const matches = value.match(new RegExp(`<${tag}>([\s\S]*?)<\/${tag}>`, 'g')) || [];
      const keepContents = matches.reduce((text: string, match: string) => {
        return text.replace(match, match.replace(new RegExp(`(<${tag}>)|(<\/${tag}>)`, 'g'), ''));
      }, value);
      if (tag === 'rom\\-mobile') {
        return keepContents.replace(/<rom-desktop>([\s\S]*?)<\/rom-desktop>/g, '');
      }
      return keepContents.replace(/<rom-mobile>([\s\S]*?)<\/rom-mobile>/g, '');
    }
    return '';
  }

}
