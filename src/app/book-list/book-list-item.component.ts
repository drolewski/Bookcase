import {Component, Input, Output, EventEmitter} from '@angular/core';
import {BookModel, BookStatusOption} from './book.model';
import {Router} from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {User} from '../authentication/user.model';
import {BookListService} from './book-list.service';

@Component({
  selector: 'app-book-list-item',
  template: `
    <div class="list-group-item row">
      <div class="row text-center align-items-center">
        <div class="col-md-3 text-break">{{book.title}}</div>
        <div class="col-md-3 text-break">{{book.author}}</div>

        <div class="col-md-3"> {{book.status}}</div>
        <div class="col-md-3">
          <button class="btn btn-primary" *ngIf="isBookAvailable()" (click)="onClickAssignMe()">Wypożycz</button>
          <button class="btn btn-primary" *ngIf="!isBookAvailable() && isCurrentUserOwner()" (click)="onClickUnassignMe()">Oddaj</button>
          <p *ngIf="!isBookAvailable() && !isCurrentUserOwner()"> {{ book.owner }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['book-list-item.component.scss']
})
export class BookListItemComponent {
  @Input() book: BookModel;

  constructor(private router: Router,
              private dataStorageService: DataStorageService,
              private bookListService: BookListService) {
  }

  onClickAssignMe(): void {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.bookListService.addOwner(this.book, user.email);
      this.dataStorageService.addBookOwner(this.book, user.email);
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onClickUnassignMe(): void {
    // this.dataStorageService.deleteBookOwner(this.book);
  }

  isBookAvailable(): boolean {
    return this.book.status === BookStatusOption.AVAILABLE;
  }

  isCurrentUserOwner(): boolean {
    const user = JSON.parse(localStorage.getItem('userData'));
    return user && user.id === this.book.owner;
  }
}
