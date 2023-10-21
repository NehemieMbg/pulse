import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';

export function middleware(request: NextRequest) {
  //   console.log('From middleware');
  //   const storage = multer.memoryStorage();
  //   const upload = multer({ storage: storage });
  //   upload.single('image');
}

export const config = {
  matcher: '/api/posts',
};
