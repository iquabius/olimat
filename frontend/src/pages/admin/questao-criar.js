import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionCreateForm from '../../components/Question/CreateForm';
import { compose } from 'recompose';
import { withRouter } from 'next/router';

const PageQuestionCreate = ({ router }) => (
  <AppFrame>
    <AppContent>
      <QuestionCreateForm id={router.query.id} />
    </AppContent>
  </AppFrame>
);

PageQuestionCreate.propTypes = {
  router: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withRouter,
)(PageQuestionCreate);
