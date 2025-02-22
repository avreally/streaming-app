/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignInImport } from './routes/signIn'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const AllTracksLazyImport = createFileRoute('/allTracks')()

// Create/Update Routes

const AllTracksLazyRoute = AllTracksLazyImport.update({
  id: '/allTracks',
  path: '/allTracks',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/allTracks.lazy').then((d) => d.Route))

const SignInRoute = SignInImport.update({
  id: '/signIn',
  path: '/signIn',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/signIn': {
      id: '/signIn'
      path: '/signIn'
      fullPath: '/signIn'
      preLoaderRoute: typeof SignInImport
      parentRoute: typeof rootRoute
    }
    '/allTracks': {
      id: '/allTracks'
      path: '/allTracks'
      fullPath: '/allTracks'
      preLoaderRoute: typeof AllTracksLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/signIn': typeof SignInRoute
  '/allTracks': typeof AllTracksLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/signIn': typeof SignInRoute
  '/allTracks': typeof AllTracksLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/signIn': typeof SignInRoute
  '/allTracks': typeof AllTracksLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/signIn' | '/allTracks'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/signIn' | '/allTracks'
  id: '__root__' | '/' | '/signIn' | '/allTracks'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SignInRoute: typeof SignInRoute
  AllTracksLazyRoute: typeof AllTracksLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SignInRoute: SignInRoute,
  AllTracksLazyRoute: AllTracksLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/signIn",
        "/allTracks"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/signIn": {
      "filePath": "signIn.jsx"
    },
    "/allTracks": {
      "filePath": "allTracks.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
