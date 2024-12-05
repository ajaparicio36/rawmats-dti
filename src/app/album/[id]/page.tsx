import React from "react";

const AlbumPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>This is the page for album {id}</div>;
};

export default AlbumPage;
