import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BookModel} from '../book-list/book.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BookListService} from '../book-list/book-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private bookListService: BookListService
  ) {
  }

  fetchBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(
      'https://bookcase-3077b.firebaseio.com/books.json'
    )
      .pipe(tap(books => {
          console.log(books);
          this.bookListService.setBooks(books);
        })
      );
  }

  addBook(newBook: BookModel, books: BookModel[]): void {
    const booksList = books;
    booksList.push(newBook);
    console.log(booksList);
    this.http.put(
      'https://bookcase-3077b.firebaseio.com/books.json',
      booksList
    )
      .subscribe(response => {
        console.log(response);
      });
  }
}
