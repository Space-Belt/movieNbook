#import "AppDelegate.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "movieNbook-Swift.h" // Bridging Header


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  SplashViewController *splashVC = [[SplashViewController alloc] init];
  self.window.rootViewController = splashVC;
  [self.window makeKeyAndVisible];
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                     moduleName:@"movieNbook"
                                              initialProperties:nil];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
  });
  
  return YES;
}



- (void)showReactNativeScreen
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"movieNbook"  // 여기에 프로젝트 이름을 넣으세요
                                            initialProperties:nil];

  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
}


















- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end



// #import "AppDelegate.h"
// #import "movieNbook-Swift.h" // Bridging Header

// #import <React/RCTBundleURLProvider.h>
// #import <React/RCTRootView.h>

// @implementation AppDelegate

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//   SplashViewController *splashVC = [[SplashViewController alloc] init];
//   self.window.rootViewController = splashVC;
//   [self.window makeKeyAndVisible];
  
//   dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//     RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
//     RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
//                                                      moduleName:@"movieNbook"
//                                               initialProperties:nil];
//     UIViewController *rootViewController = [UIViewController new];
//     rootViewController.view = rootView;
//     self.window.rootViewController = rootViewController;
//   });
  
//   return YES;
// }

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
//   return [self getBundleURL];
// }

// - (NSURL *)getBundleURL
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

// @end




// #import "AppDelegate.h"
// #import "movieNbook-Swift.h"

// #import <React/RCTBundleURLProvider.h>

// @implementation AppDelegate






// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   self.moduleName = @"movieNbook";
//   // You can add your custom initial props in the dictionary below.
//   // They will be passed down to the ViewController used by React Native.
//   self.initialProps = @{};

//   return [super application:application didFinishLaunchingWithOptions:launchOptions];
// }

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
//   return [self getBundleURL];
// }

// - (NSURL *)getBundleURL
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

// @end
