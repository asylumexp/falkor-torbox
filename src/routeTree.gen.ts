/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const LibraryLazyImport = createFileRoute('/library')()
const DownloadsLazyImport = createFileRoute('/downloads')()
const SectionsNewReleasesLazyImport = createFileRoute('/sections/newReleases')()
const SectionsMostAnticipatedLazyImport = createFileRoute(
  '/sections/mostAnticipated',
)()
const InfoIdLazyImport = createFileRoute('/info/$id')()

// Create/Update Routes

const LibraryLazyRoute = LibraryLazyImport.update({
  id: '/library',
  path: '/library',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/library.lazy').then((d) => d.Route))

const DownloadsLazyRoute = DownloadsLazyImport.update({
  id: '/downloads',
  path: '/downloads',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/downloads.lazy').then((d) => d.Route))

const SettingsRoute = SettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SectionsNewReleasesLazyRoute = SectionsNewReleasesLazyImport.update({
  id: '/sections/newReleases',
  path: '/sections/newReleases',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/sections/newReleases.lazy').then((d) => d.Route),
)

const SectionsMostAnticipatedLazyRoute =
  SectionsMostAnticipatedLazyImport.update({
    id: '/sections/mostAnticipated',
    path: '/sections/mostAnticipated',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/sections/mostAnticipated.lazy').then((d) => d.Route),
  )

const InfoIdLazyRoute = InfoIdLazyImport.update({
  id: '/info/$id',
  path: '/info/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/info/$id.lazy').then((d) => d.Route))

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
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/downloads': {
      id: '/downloads'
      path: '/downloads'
      fullPath: '/downloads'
      preLoaderRoute: typeof DownloadsLazyImport
      parentRoute: typeof rootRoute
    }
    '/library': {
      id: '/library'
      path: '/library'
      fullPath: '/library'
      preLoaderRoute: typeof LibraryLazyImport
      parentRoute: typeof rootRoute
    }
    '/info/$id': {
      id: '/info/$id'
      path: '/info/$id'
      fullPath: '/info/$id'
      preLoaderRoute: typeof InfoIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/sections/mostAnticipated': {
      id: '/sections/mostAnticipated'
      path: '/sections/mostAnticipated'
      fullPath: '/sections/mostAnticipated'
      preLoaderRoute: typeof SectionsMostAnticipatedLazyImport
      parentRoute: typeof rootRoute
    }
    '/sections/newReleases': {
      id: '/sections/newReleases'
      path: '/sections/newReleases'
      fullPath: '/sections/newReleases'
      preLoaderRoute: typeof SectionsNewReleasesLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/settings': typeof SettingsRoute
  '/downloads': typeof DownloadsLazyRoute
  '/library': typeof LibraryLazyRoute
  '/info/$id': typeof InfoIdLazyRoute
  '/sections/mostAnticipated': typeof SectionsMostAnticipatedLazyRoute
  '/sections/newReleases': typeof SectionsNewReleasesLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/settings': typeof SettingsRoute
  '/downloads': typeof DownloadsLazyRoute
  '/library': typeof LibraryLazyRoute
  '/info/$id': typeof InfoIdLazyRoute
  '/sections/mostAnticipated': typeof SectionsMostAnticipatedLazyRoute
  '/sections/newReleases': typeof SectionsNewReleasesLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/settings': typeof SettingsRoute
  '/downloads': typeof DownloadsLazyRoute
  '/library': typeof LibraryLazyRoute
  '/info/$id': typeof InfoIdLazyRoute
  '/sections/mostAnticipated': typeof SectionsMostAnticipatedLazyRoute
  '/sections/newReleases': typeof SectionsNewReleasesLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/settings'
    | '/downloads'
    | '/library'
    | '/info/$id'
    | '/sections/mostAnticipated'
    | '/sections/newReleases'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/settings'
    | '/downloads'
    | '/library'
    | '/info/$id'
    | '/sections/mostAnticipated'
    | '/sections/newReleases'
  id:
    | '__root__'
    | '/'
    | '/settings'
    | '/downloads'
    | '/library'
    | '/info/$id'
    | '/sections/mostAnticipated'
    | '/sections/newReleases'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SettingsRoute: typeof SettingsRoute
  DownloadsLazyRoute: typeof DownloadsLazyRoute
  LibraryLazyRoute: typeof LibraryLazyRoute
  InfoIdLazyRoute: typeof InfoIdLazyRoute
  SectionsMostAnticipatedLazyRoute: typeof SectionsMostAnticipatedLazyRoute
  SectionsNewReleasesLazyRoute: typeof SectionsNewReleasesLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SettingsRoute: SettingsRoute,
  DownloadsLazyRoute: DownloadsLazyRoute,
  LibraryLazyRoute: LibraryLazyRoute,
  InfoIdLazyRoute: InfoIdLazyRoute,
  SectionsMostAnticipatedLazyRoute: SectionsMostAnticipatedLazyRoute,
  SectionsNewReleasesLazyRoute: SectionsNewReleasesLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/settings",
        "/downloads",
        "/library",
        "/info/$id",
        "/sections/mostAnticipated",
        "/sections/newReleases"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    },
    "/downloads": {
      "filePath": "downloads.lazy.tsx"
    },
    "/library": {
      "filePath": "library.lazy.tsx"
    },
    "/info/$id": {
      "filePath": "info/$id.lazy.tsx"
    },
    "/sections/mostAnticipated": {
      "filePath": "sections/mostAnticipated.lazy.tsx"
    },
    "/sections/newReleases": {
      "filePath": "sections/newReleases.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
