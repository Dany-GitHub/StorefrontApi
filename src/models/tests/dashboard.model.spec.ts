import { OrderProductsModel } from '../services/dashboard.model';

const orderProductsModel = new OrderProductsModel();
describe('Testing Dashboard Model', () => {
  describe('Testing Dashboard Methods Existence', () => {
    it('getActiveUserOrdersProducts method should exist', function() {
      expect(orderProductsModel.getActiveUserOrdersProducts).toBeDefined()
    });
    it('getCompletedUserOrdersProducts method should exist', function() {
      expect(orderProductsModel.getCompletedUserOrdersProducts).toBeDefined()
    });
    it('getTop5OrderProducts method should exist', function() {
      expect(orderProductsModel.getTop5OrderProducts).toBeDefined()
    });
  });
});