'use client'
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const HistoryBackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    // Check if there is a history entry to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // Optionally, handle the case where there's no history
      // For example, redirect to home page if no history
      router.push('/');
    }
  };

  return (
    <Button variant={"link"} onClick={handleBack}>
      Go Back
    </Button>
  );
};

export default HistoryBackButton;
