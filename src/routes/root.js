import nav from '../components/nav';
import sidebar from '../components/sidebar';
import todoForm from '../components/todoForm';
import projectForm from '../components/projectForm';
import main from '../components/main';

const root = {
  children: [nav, sidebar, todoForm.content(), projectForm.content(), main],
};

export default root;
