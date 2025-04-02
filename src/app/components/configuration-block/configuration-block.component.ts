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

  @Output() applyConfig = new EventEmitter<void>();

  applyConfiguration() {
    this.applyConfig.emit();
  }
}
