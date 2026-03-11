const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const viewId = item.dataset.view;

    navItems.forEach((i) => i.classList.remove('active'));
    views.forEach((v) => v.classList.remove('active'));

    item.classList.add('active');
    document.getElementById(viewId)?.classList.add('active');
  });
});
