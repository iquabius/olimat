import React from 'react';
import PropTypes from 'prop-types';
import withRoot from '../../utils/withRoot';
import AppFrame from '../../components/AppFrame';
import AppContent from '../../components/AppContent';
import QuestionDetails from '../../components/Question/Details';
import { compose } from 'recompose';
import { withRouter } from 'next/router';

const PageQuestion = ({ router }) => (
  <AppFrame>
    <AppContent>
      <QuestionDetails id={router.query.id} />
    </AppContent>
  </AppFrame>
);

PageQuestion.propTypes = {
  router: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withRouter,
)(PageQuestion);
