import {StyleSheet} from 'react-native';
import COLORS from '../../consts/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 8,
    marginBottom: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentHeaderIcon: {
    marginRight: 8,
  },
  paymentHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentDetails: {
    flexDirection: 'column',
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  paymentDetailValue: {
    fontSize: 16,
  },
  orderSummaryContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderSummaryHeaderIcon: {
    marginRight: 8,
  },
  orderSummaryHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 16,
  },
  orderItemPrice: {
    fontSize: 16,
  },
  bottomContainer: {
    backgroundColor: COLORS.green,
    padding: 16,
  },
  totalPriceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
  },
  // addressInput: {
  //     backgroundColor: COLORS.white,
  //     borderRadius: 5,
  //     marginBottom: 16,
  //     paddingHorizontal: 8,
  //     paddingVertical: 4,
  // },
  checkoutButton: {
    backgroundColor: COLORS.white,
    color: COLORS.green,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.green,
  },
});

export default style;
