const form = document.querySelector<HTMLFormElement>('[data-contact-form]')!;
const sendButton = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
const statusMessage = form.querySelector<HTMLElement>('[role="status"]')!;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  sendButton.disabled = true;
  statusMessage.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    if (!response.ok) throw new Error(`Form service responded ${response.status}.`);
    form.reset();
    statusMessage.textContent = "Thanks — I'll be in touch.";
  } catch (error) {
    console.error('Contact form submission failed.', error);
    statusMessage.textContent = `That didn't send. Email me at ${form.dataset.fallbackEmail} instead.`;
  } finally {
    sendButton.disabled = false;
  }
});
