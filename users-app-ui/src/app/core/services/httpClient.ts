import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class HttpClientService {
  private _domainUrl: string;

  private activeRequests = 0;
  private _loadingSource = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  public get domainUrl(): string {
    return this._domainUrl;
  }

  public get(url): Promise<any> {
    const buildRequest = () => {
      return Promise.resolve(new HttpRequest('GET', url, {
        reportProgress: false,
      }));
    };
    // wait for session if it's still not resolved (will throw error if couldn't init session)
    // build request with latest headers,
    // send request to server
    return buildRequest().then((request) => this.sendRequest(request));
  }


  public post(url, body): Promise<any> {
    const buildRequest = () => {
      return Promise.resolve(new HttpRequest('POST', url, body, {
        reportProgress: false,
      }));
    };

    // wait for session if it's still not resolved (will throw error if couldn't init session)
    // build request with latest headers,
    // send request to server
    return buildRequest().then((request) => this.sendRequest(request));
  }

  private sendRequest(request: HttpRequest<any>) {
    return new Promise((resolve, reject) => {
      ++this.activeRequests;
      this._loadingSource.next(this.activeRequests > 0);
      const obs = this.http.request(request).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            // console.log('Request sent!');
            break;
          case HttpEventType.ResponseHeader:
            // console.log('Response headers received!');
            break;
          case HttpEventType.DownloadProgress:
            // const kbLoaded = Math.round(event.loaded / 1024);
            // console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
            break;
          case HttpEventType.Response:
            // console.log('Response received');
            resolve(event.body);
        }
      }, (error) => {
        // console.log(error);
        reject(error);
        obs.unsubscribe();
        --this.activeRequests;
        this._loadingSource.next(this.activeRequests > 0);
      }, () => {
        // console.log('complete');
        obs.unsubscribe();
        --this.activeRequests;
        this._loadingSource.next(this.activeRequests > 0);
      });
    });
  }
}
