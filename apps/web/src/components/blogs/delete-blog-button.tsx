'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function DeleteBlogButton({ blogId }: { blogId: string }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      router.push('/blogs');
    },
  });

  const handleDelete = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h2 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h2>
      <button
        onClick={handleDelete}
        disabled={mutation.isPending}
        className={`px-4 py-2 rounded-md text-white ${
          isConfirming
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {mutation.isPending
          ? 'Deleting...'
          : isConfirming
          ? 'Click again to confirm deletion'
          : 'Delete Blog Post'}
      </button>
      {isConfirming && (
        <p className="mt-2 text-sm text-gray-600">
          This action cannot be undone. All data associated with this blog post will be permanently deleted.
        </p>
      )}
    </div>
  );
} 