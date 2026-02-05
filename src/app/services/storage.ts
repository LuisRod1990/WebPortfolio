import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set(key: string, value: string) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  get(key: string): string | null {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
      ? localStorage.getItem(key)
      : null;
  }

  remove(key: string) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
}