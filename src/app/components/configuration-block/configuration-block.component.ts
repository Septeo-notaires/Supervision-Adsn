import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-configuration-block',
  imports: [
    NgClass,
    NgIf,
    NgStyle
  ],
  templateUrl: './configuration-block.component.html',
  styleUrl: './configuration-block.component.css'
})
export class ConfigurationBlockComponent {
  @Input() title!: string;
  @Input() currentConfig!: string | string[] | null;
  @Input() rightConfig!: string;
  @Input() isSuccess!: boolean;
  @Input() infoMessage: string = "Vous devriez appliquer cette configuration.";
  @Input() path!: string;

  @Output() applyConfig = new EventEmitter<void>();

  copied = false;

  copyToClipboard() {
    if (!this.rightConfig) return;

    navigator.clipboard.writeText(this.rightConfig).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }).catch(err => {
      console.error('Erreur lors de la copie :', err);
    });
  }

  applyConfiguration() {
    this.applyConfig.emit();
  }
}
