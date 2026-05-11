import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // { path: 'brand/:id', renderMode: RenderMode.Server },
  // {path: 'product/:slug', renderMode: RenderMode.Server},
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
