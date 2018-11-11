import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionUpdateForm from '../../components/Question/UpdateForm';
import { compose } from 'recompose';
import { withRouter } from 'next/router';

const PageQuestionUpdate = ({ router }) => (
  <AppFrame>
    <AppContent>
      <QuestionUpdateForm id={router.query.id} />
    </AppContent>
  </AppFrame>
);

PageQuestionUpdate.propTypes = {
  router: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withRouter,
)(PageQuestionUpdate);
