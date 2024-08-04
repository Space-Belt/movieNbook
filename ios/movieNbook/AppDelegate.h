//#import <RCTAppDelegate.h>
//#import <UIKit/UIKit.h>
//#import <React/RCTBridgeDelegate.h>
//
//@interface AppDelegate : RCTAppDelegate
//
//@end

#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeDelegate.h>

@interface AppDelegate : RCTAppDelegate <RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;
- (void)showReactNativeScreen;

@end
