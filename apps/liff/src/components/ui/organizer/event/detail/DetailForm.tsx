import EletterForm from '@/components/ui/organizer/event/detail/EletterForm';
import EventTextForm from '@/components/ui/organizer/event/detail/EventTextForm';
import MessageForm from '@/components/ui/organizer/event/detail/MessageForm';

import { SlidePopUpX, SlidePopupY } from './SlidePopup';

interface DetailFormProp {
  page: number;
  onClose: () => void;
}

function DetailForm({ page, onClose }: DetailFormProp) {
  return (
    <div className='h-full w-full'>
      {page === 1 && (
        <div>
          <SlidePopupY onClose={onClose}>
            <EletterForm />
          </SlidePopupY>
        </div>
      )}
      {page === 2 && (
        <div>
          <SlidePopUpX onClose={onClose}>
            <EventTextForm />
          </SlidePopUpX>
        </div>
      )}
      {page === 3 && (
        <div>
          <SlidePopUpX onClose={onClose}>
            <MessageForm />
          </SlidePopUpX>
        </div>
      )}
    </div>
  );
}

export default DetailForm;
