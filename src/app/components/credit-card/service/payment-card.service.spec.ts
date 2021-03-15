import { TestBed } from '@angular/core/testing';

import { CardType } from '../domain/card-type.enum';
import { PaymentCardServices } from './payment-card-services.service';

describe('PaymentCardPaymentCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentCardServices],
    });
  });

  it('should be created', () => {
    expect(PaymentCardServices).toBeTruthy();
  });

  describe('getCardType', () => {
    it('should detect AMERICAN_EXPRESS', () => {
      expect(PaymentCardServices.getCardType('377740327049504')).toBe(CardType.AMERICAN_EXPRESS);
      expect(PaymentCardServices.getCardType('372774294508668')).toBe(CardType.AMERICAN_EXPRESS);
    });

    it('should detect DINERS', () => {
      expect(PaymentCardServices.getCardType('36678417462141')).toBe(CardType.DINERS);
      expect(PaymentCardServices.getCardType('36122381051416')).toBe(CardType.DINERS);
    });

    it('should detect DINERS_CARTE_BLANCHE', () => {
      expect(PaymentCardServices.getCardType('30310723060882')).toBe(CardType.DINERS_CARTE_BLANCHE);
      expect(PaymentCardServices.getCardType('30105635125710')).toBe(CardType.DINERS_CARTE_BLANCHE);
    });

    it('should detect DISCOVER_CLUB ', () => {
      expect(PaymentCardServices.getCardType('6011611639813367')).toBe(CardType.DISCOVER_CLUB);
      expect(PaymentCardServices.getCardType('6011040601455298')).toBe(CardType.DISCOVER_CLUB);
    });

    it('should detect CHINA_UNIONPAY', () => {
      expect(PaymentCardServices.getCardType('6281620341037549')).toBe(CardType.CHINA_UNIONPAY);
      expect(PaymentCardServices.getCardType('6237083013714488')).toBe(CardType.CHINA_UNIONPAY);
    });

    it('should detect JCB', () => {
      expect(PaymentCardServices.getCardType('3569198543021504')).toBe(CardType.JCB);
      expect(PaymentCardServices.getCardType('3529500239872869')).toBe(CardType.JCB);
    });

    it('should detect LASER', () => {
      expect(PaymentCardServices.getCardType('6304611158942658')).toBe(CardType.LASER);
    });

    it('should detect MAESTRO', () => {
      expect(PaymentCardServices.getCardType('5053026275762086')).toBe(CardType.MAESTRO);
      expect(PaymentCardServices.getCardType('5030644144155643')).toBe(CardType.MAESTRO);
    });

    it('should detect MASTERCARD', () => {
      expect(PaymentCardServices.getCardType('5585800405742631')).toBe(CardType.MASTERCARD);
      expect(PaymentCardServices.getCardType('5579644035345946')).toBe(CardType.MASTERCARD);
    });

    it('should detect VISA_ELECTRON', () => {
      expect(PaymentCardServices.getCardType('4917907514666080')).toBe(CardType.VISA_ELECTRON);
      expect(PaymentCardServices.getCardType('4913961879483056')).toBe(CardType.VISA_ELECTRON);
    });

    it('should detect VISA', () => {
      expect(PaymentCardServices.getCardType('4539330631653907')).toBe(CardType.VISA);
      expect(PaymentCardServices.getCardType('4929975343720')).toBe(CardType.VISA);
    });

    it('should detect card type if number contains spaces', () => {
      expect(PaymentCardServices.getCardType('4539 3306 3165 3907')).toBe(CardType.VISA);
      expect(PaymentCardServices.getCardType('5579 6440 3534 5946')).toBe(CardType.MASTERCARD);
    });

    it('should detect card type if number contains hyphens', () => {
      expect(PaymentCardServices.getCardType('4539-3306-3165-3907')).toBe(CardType.VISA);
      expect(PaymentCardServices.getCardType('5579-6440-3534-5946')).toBe(CardType.MASTERCARD);
    });

    it('should return null if no card type was detected', () => {
      expect(PaymentCardServices.getCardType('9139330631653907')).toBeNull();
      expect(PaymentCardServices.getCardType('993219975343720')).toBeNull();
    });
  });

  describe('getMonths', () => {
    it('should return array of months in numeric format', () => {
      expect(PaymentCardServices.getMonths().length).toEqual(12);
      expect(PaymentCardServices.getMonths()[0]).toEqual('01');
      expect(PaymentCardServices.getMonths()[1]).toEqual('02');
      expect(PaymentCardServices.getMonths()[2]).toEqual('03');
      expect(PaymentCardServices.getMonths()[3]).toEqual('04');
      expect(PaymentCardServices.getMonths()[4]).toEqual('05');
      expect(PaymentCardServices.getMonths()[5]).toEqual('06');
      expect(PaymentCardServices.getMonths()[6]).toEqual('07');
      expect(PaymentCardServices.getMonths()[7]).toEqual('08');
      expect(PaymentCardServices.getMonths()[8]).toEqual('09');
      expect(PaymentCardServices.getMonths()[9]).toEqual('10');
      expect(PaymentCardServices.getMonths()[10]).toEqual('11');
      expect(PaymentCardServices.getMonths()[11]).toEqual('12');
    });
  });

  describe('getYears', () => {
    it('should return array of years with two in the past and 4 in the future', () => {
      expect(PaymentCardServices.getYears().length).toEqual(7);
    });
  });
});
