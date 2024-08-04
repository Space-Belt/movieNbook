//
//  SplashViewController.swift
//  movieNbook
//
//  Created by 우혁주 on 2024/08/03.
//

import UIKit

class SplashViewController: UIViewController {
  
  let label = UILabel()
  let splashImageView = UIImageView(frame: .zero)
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    configureUI()
  }
  
  private func configureUI() {
    self.view.backgroundColor = UIColor.orange
    
    self.view.addSubview(label)
    self.view.addSubview(splashImageView)
    
    
    label.text = "Movie and Book"
    label.textAlignment = .center
    label.font = UIFont.systemFont(ofSize: 24, weight: .bold)
    label.textColor = .white // 원하는 텍스트 색상으로 변경
    
    label.translatesAutoresizingMaskIntoConstraints = false;
    
    
    splashImageView.image = UIImage(named:"SplashScreen")
    splashImageView.contentMode = .scaleAspectFit
    splashImageView.translatesAutoresizingMaskIntoConstraints = false
    
    
    NSLayoutConstraint.activate([
      // ImageView constraints
      splashImageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      splashImageView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
      splashImageView.heightAnchor.constraint(equalToConstant: 100),
      splashImageView.widthAnchor.constraint(equalToConstant: 100),
      
      // Label constraints
      label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
      label.topAnchor.constraint(equalTo: splashImageView.bottomAnchor),
    ])
    
  }
}
