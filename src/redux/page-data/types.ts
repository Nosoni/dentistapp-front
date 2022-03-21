import { IPageData } from '../../interfaces/page';

export const SET_PAGE_DATA = 'set_page_data';
export const RESET_PAGE_DATA = 'reset_page_data';
export const UPDATE_PAGE_DATA = 'update_page_data';

export interface SetPageDataAction {
  type: typeof SET_PAGE_DATA;
  payload: IPageData;
}

export interface ResetPageDataAction {
  type: typeof RESET_PAGE_DATA;
}

export interface UpdatePageDataAction {
  type: typeof UPDATE_PAGE_DATA;
  payload: IPageData;
}

export type PageActionsTypes = SetPageDataAction | ResetPageDataAction | UpdatePageDataAction;
