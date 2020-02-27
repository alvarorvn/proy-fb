import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public url = 'http://localhost:3000';

  public categorias = [
    'Juegos', 'Deportes', 'Películas', 'Entretenimiento',
    'TV-Cine', 'Tecnología', 'Arte-Ocio', 'Música',
    'Diseño-Foto', 'Salud-Belleza', 'Alimentos-Bebidas', 'Hogar-Cocina', 'Ropa-Moda'];

  public roles = ['admin', 'editor'];

  constructor(public http: HttpClient) {}

  store(data): Observable<any> {
    return this.http.post(`${this.url}/page`, data);
  }

  list(): Observable<any> {
    return this.http.get(`${this.url}/page`);
  }

  destroy(pageId): Observable<any> {
    return this.http.delete(`${this.url}/page/${pageId}`);
  };

  show(pageId): Observable<any> {
    return this.http.get(`${this.url}/page/${pageId}`);
  };

  update(pageId, data): Observable<any> {
    return this.http.put(`${this.url}/page/${pageId}`, data);
  }

  pageById(pageId): Observable<any> {
    return this.http.get(`${this.url}/page/${pageId}`);
  }

  // followers
  getFollowers(pageId, limit = 10, page = 1): Observable<any> {
    return this.http.get(`${this.url}/page/followers/${pageId}?limit=${limit}&page=${page}`);
  }

  follow(pageId): Observable<any> {
    return this.http.post(`${this.url}/page/follow/${pageId}`, {});
  }

  // publish
  publish(data): Observable<any> {
    return this.http.post(`${this.url}/page/publish`, data);
  }

  getPublish(pageId, page = 1, limit = 10): Observable<any> {
    return this.http.get(`${this.url}/page/publish/${pageId}?page=${page}&limit=${limit}`);
  }

  getPublishMedia(pageId, video = false): Observable<any> {
    let url = `${this.url}/page/publish/images/${pageId}`;
    if (video) {
      url += `?type=video`;
    }
    return this.http.get(url);
  }

  // roles
  searchUsers(search): Observable<any> {
    return this.http.get(`${this.url}/page/user?search=${search}`);
  }

  assignRol(rol, userId, pageId): Observable<any> {
    return this.http.post(`${this.url}/page/admin`, {
      rol,
      target: userId,
      page_id: pageId
    });
  }

  getRoles(pageId): Observable<any> {
    return this.http.get(`${this.url}/page/admin/${pageId}`);
  }

  removeRol(pageId, userId): Observable<any> {
    return this.http.put(`${this.url}/page/admin/remove`, {
      target: userId,
      page_id: pageId
    });
  }
}
