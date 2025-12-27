import { useCallback } from 'react';
import { post } from '@/utils'; // Import the post utility

/**
 * Interface for the data expected by the feedback submission function.
 */
interface FeedbackSubmitData {
  content: string;
}

/**
 * Provides a memoized function to send feedback to the server for a specific topic.
 *
 * This hook takes a `topicId` and returns a function that accepts feedback `content`
 * and sends it via a POST request to the `/api/feedback` endpoint associated with that topic.
 *
 * @param {number} topicId - The ID of the feedback topic.
 * @returns {function(FeedbackSubmitData): Promise<void>} A function to send feedback content for the specified topic.
 *   The returned function takes an object with `content`,
 *   and returns a Promise that resolves when the request is complete or rejects on error.
 *
 * @example
 * const sendFeedbackForTopic1 = useSendFeedback(1);
 *
 * const handleSubmit = async (content) => {
 *   try {
 *     await sendFeedbackForTopic1({ content });
 *     // Handle success
 *   } catch (error) {
 *     // Handle error
 *     console.error('Failed to send feedback:', error);
 *   }
 * };
 */
export function useSendFeedback(
  topicId: number
): (data: FeedbackSubmitData) => Promise<void> {
  const sendFeedback = useCallback(
    async (data: FeedbackSubmitData) => {
      const { content } = data;

      // Validate topicId passed to the hook
      if (
        typeof topicId !== 'number' ||
        !Number.isInteger(topicId) ||
        topicId <= 0
      ) {
        // This validation might be redundant if the component using the hook validates,
        // but ensures the hook itself doesn't proceed with an invalid topicId.
        console.error('useSendFeedback called with invalid topicId:', topicId);
        throw new Error('Invalid topicId provided to useSendFeedback hook.');
      }

      // Validate content passed to the returned function
      if (typeof content !== 'string') {
        // Allow empty string initially, server handles trimming and empty check
        throw new Error('Invalid content: must be a string.');
      }

      try {
        // Use the post utility function, passing both topicId and content
        await post('/feedback', { topicId, content });
      } catch (error) {
        console.error(`Error sending feedback for topic ${topicId}:`, error);
        throw error; // Re-throw for the caller
      }
    },
    [topicId] // Dependency array includes topicId
  );

  return sendFeedback;
}
