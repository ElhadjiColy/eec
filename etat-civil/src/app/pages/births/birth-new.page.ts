import { waitFor } from "@analogjs/trpc";
import { Component } from "@angular/core";
import { injectTrpcClient } from "../../../../src/trpc-client";
import { Subject, shareReplay, switchMap } from "rxjs";
import { AsyncPipe, JsonPipe } from "@angular/common";


@Component({
  selector: "etat-civil-birth-new",
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
      <div>
        <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          <li class="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                1
            </span>
            <span>
                <h3 class="font-medium leading-tight">Baby info</h3>
                <p class="text-sm">Step details here</p>
            </span>
          </li>
          <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                2
            </span>
            <span>
                <h3 class="font-medium leading-tight">Mother info</h3>
                <p class="text-sm">Step details here</p>
            </span>
          </li>
          <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                3
            </span>
            <span>
                <h3 class="font-medium leading-tight">Father info</h3>
                <p class="text-sm">Step details here</p>
            </span>
          </li>
          <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                4
            </span>
            <span>
                <h3 class="font-medium leading-tight">Summary</h3>
                <p class="text-sm">Step details here</p>
            </span>
          </li>
        </ol>
      </div>

      <form action="#">
          <h3 class="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Baby details</h3>
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                  <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required="">
              </div>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
              </div>
              <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required="">
              </div>                        <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirm-password" id="confirm-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required="">
              </div>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Next Step: Payment Info
          </button>
      </form>

    </div>
  `
})
export default class BirthNewPageComponent {
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();

  public person$ = this.triggerRefresh$.pipe(
    switchMap(() => this.getPersonByCni("123456789")),
    shareReplay(1)
  );

  constructor() {
    void waitFor(this.person$);
    this.triggerRefresh$.next();
    console.log('jinger ak limon bou tangeu dieur.....')
  }

  // get person info by cni if they exist
  public getPersonByCni(cni: any) {
    const person = this._trpc.person.personByCni.query(cni);
    console.log('person ', person);

    return person;
  }

  // otherwise, create and display them
  // then create the birth record
}
