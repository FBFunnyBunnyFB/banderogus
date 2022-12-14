const MODAL_ACTIVE_CLASS_NAME = 'modal-active';
const MODALS_ID = ['inputs', 'success'];
const FORM_ID = 'form';

const $ = (selector) => {
  const result = document.querySelectorAll(selector);
  return result.length > 1 ? result : result[0];
}
const closeModal = (index) => {
  return $(`#${MODALS_ID[index]}-modal`).classList.remove(MODAL_ACTIVE_CLASS_NAME);
}
const openModal = (index) => {
  const $element = $(`#${MODALS_ID[index]}-modal`);
  return $element.classList.add(MODAL_ACTIVE_CLASS_NAME);
}
const clearInputValues = () => {
  return $('input:not([type="submit"])').forEach($el => $el.value = '');
}
const launchGus = () => {
  return new Promise(resolve => {
    const targetContainer = $(`.${MODAL_ACTIVE_CLASS_NAME}`);
    const gusImage = $('.gus-anim') || document.createElement('img');
    gusImage.setAttribute('src', './assets/gif/gus-anim.gif');
    gusImage.classList.add('gus-anim');

    targetContainer.appendChild(gusImage);

    setTimeout(resolve, 4000);
  })
}

window.onload = () => {
  $('#open-modal').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(0);
  });
  MODALS_ID.forEach((el,i) => {
    $(`#${el}-modal .close-btn`).addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal(i);
    })
  });
  $(FORM_ID).addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      e.submitter.setAttribute('disabled', '');

      const formData = new FormData($(FORM_ID));
      if(!!location.hostname.length) {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
      }
      await launchGus();
      closeModal(0);
      openModal(1);
      clearInputValues();

      e.submitter.removeAttribute('disabled', '');
    } catch (error) {
      console.log('Sending form failed', error);
    }
  })
}
