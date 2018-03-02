// Transform these into import AppFrame from 'components/AppFrame'
// https://daveceddia.com/react-project-structure/
import withData from '../../utils/withData'
import withRoot from '../../utils/withRoot'
import compose from 'recompose/compose'
import AppFrame from '../../components/AppFrame'
import AppContent from '../../components/AppContent'
import TestList from '../../components/TestList'

const PageAdmin = () => (
  <AppFrame>
    <AppContent>
      <TestList />
    </AppContent>
  </AppFrame>
)

export default compose(withRoot, withData)(PageAdmin)